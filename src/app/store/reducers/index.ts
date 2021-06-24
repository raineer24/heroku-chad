import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

import * as fromAuth from "../../auth/state/auth.reducer";
import * as fromUser from "../../admin/state/user.reducer";
//import * as fromDev from "../../developers/state/dev.reducer";
export interface AppState {
  auth: fromAuth.AuthState;
  user: fromUser.UserState;
  // dev: fromDev.State;
}

export const reducers: ActionReducerMap<AppState> = {
  //dev: fromDev.reducer,
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
};

// La première fonction amène vers le state matieres
// export const selectUserListState$ = (state: State) => state.user;
// export const selectAuthListState$ = (state: State) => state.auth;
// export const selectUsersLoaded$ = createSelector(
//   selectUserListState$,
//   (users) => users.users
// );
// export const selectUserLoaded$ = createSelector(
//   selectUserListState$,
//   (user) => user.selectedUser
// );
