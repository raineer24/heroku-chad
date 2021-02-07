import { UserFetch } from "../../core/models/userfetch";

/* NgRx */
import { Action } from "@ngrx/store";
import { UserEffects } from "../state/user.effects";
import { AnyFn } from "@ngrx/store/src/selector";

export enum UserActionTypes {
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
  UPDATE_PROFILE = "[User] Update Profile",
  UPDATE_PROFILE_SUCCESS = "[User] Update Success",
  UPDATE_PROFILE_FAIL = "[Profile] Update Profile Fail",
}

export class LoadProfileFailure implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_FAILURE;

  constructor(public payload: any) {}
}

export class LoadProfileBegin implements Action {
  readonly type = UserActionTypes.LOAD_PROFILE_BEGIN;
}

export class LoadProfileSuccess implements Action {
  public readonly type = UserActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateProfile implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE;
  constructor(public payload: { user: UserFetch }) {}
}

export class UpdateProfileSucess implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: { item: UserFetch }) {}
}

export class UpdateProfileFail implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_FAIL;

  constructor(public payload: string) {}
}

export type UserActions =
  | LoadProfileBegin
  | LoadProfileSuccess
  | LoadProfileFailure
  | UpdateProfile
  | UpdateProfileSucess;
