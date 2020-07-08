import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";
import { UserEffects } from "./user.effects";

export enum UserActionTypes {
  LOGIN = "[User] Login",
  LOGIN_SUCCESS = "[USER] Login Success",
  LoginFail = "[User] Login Fail",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout",
}

export class LogIn implements Action {
  readonly type = UserActionTypes.LOGIN;

  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type = UserActionTypes.LoginFail;

  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = UserActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = UserActionTypes.LOGOUT;
  constructor(public payload: any) {}
}

export type UserActions =
  | LogIn
  | LogInSuccess
  | LoginFail
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut;
