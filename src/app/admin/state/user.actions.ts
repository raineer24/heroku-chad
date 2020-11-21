import { UserFetch, User } from "../../core/models";

/* NgRx */
import { Action } from "@ngrx/store";
import { UserEffects } from "../state/user.effects";

export enum UserActionTypes {
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE = "[User] Load Profile",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
  UPDATE_INFO = "[User] Update Info",
  UPDATE_SUCCESS = "[User] Update Success",
}

export class LoadProfileFailure implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_FAILURE;

  constructor(public payload: any) {}
}

export class LoadProfileBegin implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_BEGIN;
}

// export class LoadEmployeeAction implements Action {
//   readonly type = EmployeeActionTypes.LOAD_EMPLOYEE;
//   constructor(public payload: number) {}
// }

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE;
  constructor(public payload: number) {}
}

// export class LoadProfileSuccess implements Action {
//   readonly type = UserActionTypes.LOAD_PROFILE_SUCCESS;

//   constructor(public payload: any) {}
// }

export class LoadProfileSuccess implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: User) {}
}

export class UpdateInfoAction implements Action {
  readonly type = UserActionTypes.UPDATE_INFO;
  constructor(public payload: { user: User }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { item: User }) {}
}

export type UserActions =
  | LoadProfileBegin
  | LoadProfileSuccess
  | LoadProfileFailure
  | UpdateInfoAction
  | UpdateSuccessAction
  | LoadUserAction;
