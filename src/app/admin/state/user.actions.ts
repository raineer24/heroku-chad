import { User } from "../../core/models/user";

/* NgRx */
import { Action } from "@ngrx/store";
import { UserEffects } from "../state/user.effects";

export enum UserActionTypes {
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
}

export class LoadProfileFailure implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_FAILURE;

  constructor(public payload: any) {}
}

export class LoadProfileBegin implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_BEGIN;
}

export class LoadProfileSuccess implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export type UserActions =
  | LoadProfileBegin
  | LoadProfileSuccess
  | LoadProfileFailure;
