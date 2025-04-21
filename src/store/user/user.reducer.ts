import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, logoutApiSuccess, logoutSuccess } from './user.actions';

import { LoginResponse } from '../../app/modules/auth/domain/models/response/login-response';

export interface UserState {
    token: string | null;
    refreshToken: string | null;
    role: string | null;

}
const storeTokensInLocalStorage = (user: LoginResponse) => {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('authRefreshToken', user.refreshToken);
    localStorage.setItem('authRole', user.role);
};

// Function to clear tokens in localStorage
const clearTokensInLocalStorage = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');
    localStorage.removeItem('authRole');
};

const initialState: UserState = {
    token: localStorage.getItem('authToken'),
    refreshToken: localStorage.getItem('authRefreshToken'),
    role: localStorage.getItem('authRole'),
};


export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => {

        storeTokensInLocalStorage(user);
        return {
            ...state,
            token: user.token,
            refreshToken: user.refreshToken,
            role: user.role,
        };
    }),



    on(logoutSuccess, () => {

        clearTokensInLocalStorage();

        return {
            token: null,
            refreshToken: null,
            role: null,
        };
    }),
    on(logoutApiSuccess, () => {

        clearTokensInLocalStorage();

        return {
            token: null,
            refreshToken: null,
            role: null,
        };
    })


);
