import { User, UserFetch } from "../../core/models";

/* NgRx */
import { Action } from "@ngrx/store";
//import { AuthEffects } from "./auth.effects";
import { Update } from "@ngrx/entity";
export enum DevActionTypes {
  LOAD_DEVELOPER_BEGIN = "[User] Load Developer Begin",
  LOAD_DEVELOPER_SUCCESS = "[User] Load Developer Success",
  LOAD_DEVELOPERS = "[User] Load Developers Begin",
  LOAD_DEVELOPERS_SUCCESS = "[DEVELOPERS] Load Developers Success",
  LOAD_DEVELOPERS_FAIL = "[DEVELOPERS] Load Developers Success",
  SELECT_USER = "[User] Select",
  CREATE_DEVELOPER = "[User] Create Developer ",
  CREATE_DEVELOPER_SUCCESS = "[User] Create Developer Success",
  UPDATE_PROFILE = "[User] Update Profile",
  UPDATE_PROFILE_SUCCESS = "[User] Update Success",
  UPDATE_PROFILE_FAIL = "[Profile] Update Profile Fail",
}

export class UpdateProfileFail implements Action {
  readonly type = DevActionTypes.UPDATE_PROFILE_FAIL;

  constructor(public payload: string) {}
}
export class UpdateProfile implements Action {
  readonly type = DevActionTypes.UPDATE_PROFILE;
  constructor(public payload: UserFetch) {}
  // constructor(public payload: any) {}
}

export class UpdateProfileSucess implements Action {
  readonly type = DevActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: Update<UserFetch>) {}
  //constructor(public payload: any) {}
}

export class SelectUserAction implements Action {
  readonly type = DevActionTypes.SELECT_USER;
  constructor(public payload: User) {}
}
export class createDeveloper implements Action {
  readonly type = DevActionTypes.CREATE_DEVELOPER;
  constructor(public payload: any) {}
}

export class createDeveloperSuccess implements Action {
  readonly type = DevActionTypes.CREATE_DEVELOPER_SUCCESS;
  constructor(public payload: any) {}
  //constructor(public payload: { entities: any; result: any }) {}
}

export class CreateDeveloperdeAction implements Action {
  public readonly type = DevActionTypes.CREATE_DEVELOPER;
  constructor(public payload: UserFetch) {}
}

export class LoadProfileBegin implements Action {
  readonly type = DevActionTypes.LOAD_DEVELOPER_BEGIN;
}

export class LoadDeveloperSuccess implements Action {
  readonly type = DevActionTypes.LOAD_DEVELOPER_SUCCESS;
  constructor(public payload: any) {}
  //constructor(public payload: { entities: any; result: any }) {}
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
  | LoadDeveloperSuccess
  | SelectUserAction
  | createDeveloper
  | createDeveloperSuccess
  | UpdateProfile
  | UpdateProfileSucess
  | UpdateProfileFail
  | LoadProfileBegin;
