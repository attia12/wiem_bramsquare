import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRefreshToken, selectToken } from '../../../store/user/user.selectors';
import { catchError, from, of, switchMap } from 'rxjs';
import { AuthService } from '../../../app/modules/auth/domain/services/auth.service';
import { loginSuccess, logout } from '../../../store/user/user.actions';
import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const _store = inject(Store);
    const _authService = inject(AuthService);
    const jwtHelper = new JwtHelperService();

    return from(
        (async () => {
            try {
                const token = await firstValueFrom(_store.select(selectToken));
                const refreshToken = await firstValueFrom(_store.select(selectRefreshToken));
                if (refreshToken && jwtHelper.isTokenExpired(refreshToken)) {
                    console.log("refresh token ------------",refreshToken)

                    //_store.dispatch(logout({ refreshToken }));
                    _store.dispatch(logout());
                    return of(req);
                }
                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                return next(req).pipe(
                    catchError((error) => {
                        if ((error.status === 401 || error.status === 403) && refreshToken && !req.url.includes('/api/auth/refresh')) {
                            // Prevent infinite loop by ensuring we are not retrying the refresh token request itself
                            return _authService.refreshAccessToken(refreshToken).pipe(
                                switchMap((response: any) => {
                                    const newToken = response.token;
                                    console.log("this is from refresh token endpointNew token:", newToken);

                                    // Update token in store
                                    _store.dispatch(loginSuccess({ user: { token: newToken, refreshToken, role: response.role } }));

                                    // Retry original request with new token
                                    const retryRequest = req.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${newToken}`,
                                        },
                                    });

                                    return next(retryRequest);
                                }),
                                catchError((refreshError) => {
                                    console.error("Refresh token failed:", refreshError);

                                    // If refresh token also fails, log out user
                                    if (refreshError.status === 401 || refreshError.status === 403) {
                                        _store.dispatch(logout());
                                        return of();
                                    }

                                    return of(refreshError);
                                })
                            );
                        }


                        return of(error);
                    })
                );
            } catch (err) {
                return next(req);
            }
        })()
    ).pipe(switchMap(response => response));
};
