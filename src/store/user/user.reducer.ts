import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './user.actions';

export interface UserState {
    token: string | null;
    refreshToken: string | null;
    role: string | null;
}

const initialState: UserState = {
    token: null,
    refreshToken: null,
    role: null,
};

export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => ({
        ...state,
        token: user.token,
        refreshToken: user.refreshToken,
        role: user.role,
    })),
    on(logout, () => ({
        token: null,
        refreshToken: null,
        role: null,
    }))
);
