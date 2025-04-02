import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectToken = createSelector(selectUserState, (state) => state.token);
export const selectRole = createSelector(selectUserState, (state) => state.role);
export const selectIsAuthenticated = createSelector(selectToken, (token) => !!token);
