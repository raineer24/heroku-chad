import { Action } from "@ngrx/store";
import { All as userActions } from "./user.actions";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  SIGNUP = "[Auth] SignUp",
  SIGNUP_SUCCESS = "[Auth] SignUp Success",
  SIGNUP_FAILURE = "[Auth] SignUp Failure",
  LOGOUT = "[Auth] Logout",
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export type All = LogIn | LogInSuccess | LogInFailure | userActions;
