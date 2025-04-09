import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { first, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../../../store/user/user.selectors';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const store: Store = inject(Store);

    return store.select(selectIsAuthenticated).pipe(
        first(),
        switchMap((isAuthenticated) => {
            if (!isAuthenticated) {
                console.log("User not authenticated, redirecting to /sign-in");
                return of(router.createUrlTree(['/sign-in']));
            }
            return of(true);
        })
    );
};
