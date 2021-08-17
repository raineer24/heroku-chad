import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOAD = "[User] Load",
  LOAD_SUCCESS = "[User] Load Success",
  LOAD_FAILURE = "[User] Load Failure",
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LOAD;

  constructor(public payload: any) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LOAD_FAILURE;

  constructor(public payload: any) {}
}

export type All = LoadUser | LoadUserSuccess | LoadUserFailure;
