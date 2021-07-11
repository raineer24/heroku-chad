import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";
import { AuthEffects } from "./auth.effects";
import { createAction, props } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[User] Login",
  LOGIN_SUCCESS = "[USER] Login Success",
  LoginFail = "[User] Login Fail",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout",
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
}

export const signup = createAction("[Auth] Signup", (payload: User) => ({
  payload,
}));

export const signupSuccess = createAction(
  "[Auth] Signup Success",
  (payload: any) => ({ payload })
);

export const login = createAction("[Auth] Login Start", (payload: any) => ({
  payload,
}));

export const loginComplete = createAction(
  "[Auth] Login SUccess",
  (payload: any) => ({ payload })
);

export class LoadProfileFailure implements Action {
  readonly type = AuthActionTypes.LOAD_PROFILE_FAILURE;

  constructor(public payload: any) {}
}

export class LoadProfileBegin implements Action {
  readonly type = AuthActionTypes.LOAD_PROFILE_BEGIN;
}

export class LoadProfileSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;

  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
  | LogOut
  | LoadProfileBegin
  | LoadProfileSuccess
  | LoadProfileFailure
  | LogInSuccess
  | LoginFail
  | SignUpFailure
  | SignUpSuccess;
