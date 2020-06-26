import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOGIN = "[User] Login",
}

export class LogIn implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: User) {}
}
