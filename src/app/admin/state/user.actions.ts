import { UserFetch } from "../../core/models/userfetch";
import { Update } from "@ngrx/entity";

/* NgRx */
import { Action } from "@ngrx/store";
import { UserEffects } from "../state/user.effects";
import { AnyFn } from "@ngrx/store/src/selector";

export enum UserActionTypes {
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
  CREATE_EXP_PROFILE_FAILURE = "[User] Create Experience Profile failure",
  CREATE_EDUCATION_FAILURE = "[User] Create Education Profile failure",
  UPDATE_PROFILE = "[User] Update Profile",
  UPDATE_PROFILE_SUCCESS = "[User] Update Success",
  UPDATE_PROFILE_FAIL = "[Profile] Update Profile Fail",
  CREATE_PROFILE = "[User] Create Profile ",
  DELETE_EDU_PROFILE = "[User] Delete Education Profile ",
  DELETE_EDU_PROFILE_SUCCESS = "[User] Delete Education Profile Success ",
  DELETE_EDU_PROFILE_FAIL = "[User] Delete Education Profile Fail ",
  DELETE_EXP_PROFILE = "[User] Delete Experience Profile ",
  CREATE_EXP_PROFILE = "[User] Create Experience Profile ",
  CREATE_EDU_PROFILE = "[User] Create Education Profile ",
  CREATE_PROFILE_SUCCESS = "[User] Create Profile Success",
  CREATE_EDU_PROFILE_SUCCESS = "[User] Create Education Profile Success",
  CREATE_EXP_PROFILE_SUCCESS = "[User] Create Experience Profile Success ",
  DELETE_EXP_PROFILE_SUCCESS = "[User] DELETE Experience Profile Success ",
  DELETE_EXP_PROFILE_FAIL = "[User] DELETE Experience Profile Fail ",
}

export class deleteEduProfile implements Action {
  readonly type = UserActionTypes.DELETE_EDU_PROFILE;
  constructor(public payload: any) {}
}
export class deleteEduProfileSuccess implements Action {
  REATE_EXP_PROFILE_FAILURE;
  readonly type = UserActionTypes.DELETE_EDU_PROFILE_SUCCESS;
  constructor(public payload: any) {}
}
export class deleteEduProfileFail implements Action {
  readonly type = UserActionTypes.DELETE_EDU_PROFILE_FAIL;
  constructor(public payload: any) {}
}
export class createEduProfile implements Action {
  readonly type = UserActionTypes.CREATE_EDU_PROFILE;
  constructor(public payload: any) {}
}
export class createEduProfileSuccess implements Action {
  readonly type = UserActionTypes.CREATE_EDU_PROFILE_SUCCESS;
  constructor(public payload: any) {}
}
export class createExpProfile implements Action {
  readonly type = UserActionTypes.CREATE_EXP_PROFILE;
  constructor(public payload: any) {}
}
export class createExpProfileeSuccess implements Action {
  readonly type = UserActionTypes.CREATE_EXP_PROFILE_SUCCESS;
  constructor(public payload: any) {}
}
export class createProfile implements Action {
  readonly type = UserActionTypes.CREATE_PROFILE;
  constructor(public payload: any) {}
}
export class deleteExpProfile implements Action {
  readonly type = UserActionTypes.DELETE_EXP_PROFILE;
  constructor(public payload: any) {}
}
export class deleteExpProfileFail implements Action {
  readonly type = UserActionTypes.DELETE_EXP_PROFILE_FAIL;
  constructor(public payload: any) {}
}
export class deleteExpProfileSuccess implements Action {
  readonly type = UserActionTypes.DELETE_EXP_PROFILE_SUCCESS;
  constructor(public payload: any) {}
}

export class createProfileSuccess implements Action {
  readonly type = UserActionTypes.CREATE_PROFILE_SUCCESS;
  constructor(public payload: any) {}
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
  constructor(public payload: UserFetch) {}
}

export class UpdateProfileSucess implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: Update<UserFetch>) {}
}

export class UpdateProfileFail implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_FAIL;

  constructor(public payload: string) {}
}

export class createExpProfileFail implements Action {
  readonly type = UserActionTypes.CREATE_EXP_PROFILE_FAILURE;

  constructor(public payload: string) {}
}
export class createEduFail implements Action {
  readonly type = UserActionTypes.CREATE_EDUCATION_FAILURE;

  constructor(public payload: string) {}
}

export type UserActions =
  | LoadProfileBegin
  | LoadProfileSuccess
  | LoadProfileFailure
  | UpdateProfile
  | UpdateProfileSucess
  | createProfile
  | createProfileSuccess
  | createExpProfile
  | createExpProfileeSuccess
  | createExpProfileFail
  | createEduProfile
  | createEduProfileSuccess
  | createEduFail
  | deleteExpProfile
  | deleteExpProfileSuccess
  | deleteExpProfile
  | deleteEduProfile
  | deleteEduProfileSuccess
  | deleteEduProfileFail;
