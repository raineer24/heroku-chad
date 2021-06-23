import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

import * as fromAuth from "../../auth/state/auth.reducer";
import * as fromUser from "../../admin/state/user.reducer";
import * as fromDev from "../../developers/state/dev.reducer";
export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
  // dev: fromDev.State;
}

export const reducers: ActionReducerMap<State> = {
  //dev: fromDev.reducer,
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};

// La première fonction amène vers le state matieres
export const selectUserListState$ = (state: State) => state.user;
export const selectAuthListState$ = (state: State) => state.auth;
export const selectUsersLoaded$ = createSelector(
  selectUserListState$,
  (users) => users.users
);
export const selectUserLoaded$ = createSelector(
  selectUserListState$,
  (user) => user.user
);
