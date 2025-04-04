import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure, logout } from './user.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginResponse } from '../../app/modules/auth/domain/models/response/login-response';


@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private http: HttpClient) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            mergeMap(({ request }) =>
                this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', request).pipe(
                    map((response) => loginSuccess({ user: response })), // Save in NgRx store
                    catchError((error) => of(loginFailure({ error: error.message })))
                )
            )
        )
    );



    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            map(() => loginSuccess({ user: { token: null, refreshToken: null, role: null } })) // Clears state
        )
    );
}
