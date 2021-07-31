import { User } from "../../core/models/user";
//import * as fromRoot from "../../state/app.state";
//import { AuthActions, AuthActionTypes } from "./auth.action";
import { v4 as uuidv4 } from "uuid";
import * as fromRoot from "../../store/reducers";
import * as AuthActions from "./auth.action";
//import { loginComplete, signupSuccess } from "../state";

import {
  createFeatureSelector, //on(authActions.login, (state: AuthState) => ({ ...state, loginLoading: true, currentUser: null })),
  createSelector,
  createReducer,
  on,
  createAction,
  props,
  Action,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IUser } from "../../interfaces/user.interface";

export interface AuthModuleState {
  auth: AuthState;
}

export interface AuthState {
  loginLoading: boolean;
  currentUser: IUser;
  registerLoading: boolean;
  userLoading: boolean;
}

export const initialState: AuthState = {
  loginLoading: false,
  currentUser: null,
  registerLoading: false,
  userLoading: false,
};

export const AUTH_REDUCER = createReducer(
  initialState,
  on(AuthActions.login, (state: AuthState) => ({
    ...state,
    loginLoading: true,
    currentUser: null,
  })),
  on(AuthActions.loginSuccess, (state: AuthState, { user }) => ({
    ...state,
    loginLoading: false,
    currentUser: user,
  })),

  on(AuthActions.register, (state) => ({ ...state, registerLoading: true })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    registerLoading: false,
  })),
  on(AuthActions.registerFail, (state) => ({
    ...state,
    registerLoading: false,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
