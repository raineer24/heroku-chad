import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

import * as fromAuth from "../../auth/state/auth.reducer";

export interface State {
  auth: fromAuth.State;
  //user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  //user: fromUser.reducer,
};
