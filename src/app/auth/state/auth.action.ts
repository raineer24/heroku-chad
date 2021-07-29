import { createAction, props } from "@ngrx/store";

import { ILoginUser } from "../../interfaces/user.interface";
export const login = createAction(
  "[Authorization] Login user",
  props<{ data: ILoginUser }>()
);

export const logoutUser = createAction("[Authorization] Logout user");
