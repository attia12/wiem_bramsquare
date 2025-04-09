import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from './user.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginResponse } from '../../app/modules/auth/domain/models/response/login-response';
import { AuthService } from '../../app/modules/auth/domain/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';



@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private http: HttpClient,
                private authService: AuthService,
                private router: Router,
                private store: Store) {
    }

    // login$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(login),
    //         mergeMap(({ request }) =>
    //             this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', request).pipe(
    //                 map((response) => loginSuccess({ user: response })), // Save in NgRx store
    //                 catchError(() => of(loginFailure()))
    //             )
    //         )
    //     )
    // );
    login$ = createEffect(() =>

        this.actions$.pipe(
            ofType(login),
            mergeMap(({ request }) =>
                this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', request).pipe(
                    map((response) => loginSuccess({ user: response })), // Dispatch loginSuccess on success
                    catchError((error) =>

                        of(loginFailure({ error: error.message })))
                )
            )
        )
    );


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            map(() => {

                this.router.navigate(['/sign-in']).then(() => {
                    window.location.reload();
                });
                return logoutSuccess(); // Dispatch logout success action
            })
        )
    );
}
