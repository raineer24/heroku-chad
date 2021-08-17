import * as auth from "./reducers/auth.reducer";
import * as user from "./reducers/user.reducer";
import { createFeatureSelector } from "@ngrx/store";

export interface AppState {
  authState: auth.State;
  userState: user.State;
}

export const reducers = {
  auth: auth.reducer,
  user: user.userReducer,
};

export const selectAuthState = createFeatureSelector<AppState>("auth");
export const selectUserState = createFeatureSelector<AppState>("user");
