import { createAction, props } from "@ngrx/store";

import {
  ILoginUser,
  IUser,
  IRegisterUser,
} from "../../interfaces/user.interface";
export const login = createAction(
  "[Authorization] Login user",
  props<{ data: ILoginUser }>()
);
export const loginSuccess = createAction(
  "[Authorization] Login user success",
  props<{ user: IUser }>()
);

export const register = createAction(
  "[Authorization] Register user",
  props<{ data: IRegisterUser | FormData }>()
);
export const registerSuccess = createAction(
  "[Authorization] Register user success"
);
export const registerFail = createAction("[Authorization] Register user fail");

export const loginFail = createAction("[Authorization] Login user fail");

export const logoutUser = createAction("[Authorization] Logout user");
