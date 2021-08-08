import { Action } from "@ngrx/store";

export enum UserActionTypes {
  EDIT = "[User] Edit",
  EDIT_SUCCESS = "[User] Edit Success",
  EDIT_FAILURE = "[User] Edit Failure",
  LOAD = "[User] Load",
  LOAD_BOXER = "[Boxer] Load",
  LOAD_SUCCESS = "[User] Load Success",
  LOAD_FAILURE = "[User] Load Failure",
  LOAD_INDEPENDENT_BOXERS = "[Boxers] Load Independent Boxers",
  LOAD_USER_LIST_SUCCESS = "[User] Load list success",
}

export class EditUser implements Action {
  readonly type = UserActionTypes.EDIT;

  constructor(public payload: FormData) {}
}

export type All = EditUser;
