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
  dev: fromDev.State;
}

export const reducers: ActionReducerMap<State> = {
  dev: fromDev.reducer,
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};
