import {
  ActionReducerMap,
  ActionReducer,
  Action,
  MetaReducer,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromUserInfo from "../user/user.reducer";

export interface State {
  userInfo: fromUserInfo.State;
}
