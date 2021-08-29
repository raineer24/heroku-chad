import { Action } from "@ngrx/store";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserActionTypes {
  GET_USER = "[User] GET_USER",
  GET_USER_SUCCESS = "[User] GET_USER_SUCCESS",
  GET_USER_FAIL = "[User] GET_USER_FAIL",
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetUserAction implements Action {
  readonly type = UserActionTypes.GET_USER;

  constructor(public payload: { id: string }) {}
}

export class GetUserSuccessAction implements Action {
  readonly type = UserActionTypes.GET_USER_SUCCESS;

  constructor(public payload: any) {}
}
export class GetUserFailAction implements Action {
  readonly type = UserActionTypes.GET_USER_FAIL;
  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActions =
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailAction;
