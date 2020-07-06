import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOGIN = "[User] Login",
  LOGIN_SUCCESS = "[USER] Login Success",
  LoginFail = "[User] Login Fail",
  SIGNUP = "[Auth] Signup",
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

export type UserActions = LogIn | LogInSuccess | LoginFail | SignUp;
