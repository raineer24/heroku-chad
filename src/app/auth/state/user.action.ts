import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOGIN = "[User] Login",
  LOGIN_SUCCESS = "[USER] Login Success",
}

export class LogIn implements Action {
  readonly type = UserActionTypes.LOGIN;

  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export type UserActions = LogIn | LogInSuccess;
