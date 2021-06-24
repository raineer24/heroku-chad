import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";
//import { AuthEffects } from "./auth.effects";

export enum DevActionTypes {
  LOAD_DEVELOPERS = "[User] Load Developers Begin",
  LOAD_DEVELOPERS_SUCCESS = "[DEVELOPERS] Load Developers Success",
  LOAD_DEVELOPERS_FAIL = "[DEVELOPERS] Load Developers Success",
  SELECT_USER = "[User] Select",
}

export class SelectUserAction implements Action {
  readonly type = DevActionTypes.SELECT_USER;
  constructor(public payload: User) {}
}

export class loadDevelopersAction implements Action {
  readonly type = DevActionTypes.LOAD_DEVELOPERS;
}

export class loadDevelopersSuccessAction implements Action {
  readonly type = DevActionTypes.LOAD_DEVELOPERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class loadDevelopersFail implements Action {
  readonly type = DevActionTypes.LOAD_DEVELOPERS_FAIL;

  constructor(public payload: any) {}
}
export type DevActions =
  | loadDevelopersAction
  | loadDevelopersSuccessAction
  | loadDevelopersFail
  | SelectUserAction;
