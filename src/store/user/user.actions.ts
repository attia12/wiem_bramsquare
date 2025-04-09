import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../app/modules/auth/domain/models/request/login-request';
import { LoginResponse } from '../../app/modules/auth/domain/models/response/login-response';



export const login = createAction(
    '[Auth] Login',
    props<{ request: LoginRequest }>()
);


export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: LoginResponse }>()
);


export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);


// export const logout = createAction(
//     '[Auth] Logout',
//     props<{ refreshToken: string }>() // Ensure refreshToken is passed
// );
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
    '[Auth] Logout Failure',
    props<{ error: string }>()
);
