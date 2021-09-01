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

export const reducers: ActionReducerMap<State> = {
  userInfo: fromUserInfo.reducer,
};

export function clearState(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function (state: State, action: Action): State {
    if (action.type === "CLEAR_PROFILE_STATE") {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducer: MetaReducer<State>[] = [clearState];

export const getProfileState = createFeatureSelector<State>("user");

export const getUserInfoState = createSelector(
  getProfileState,
  (state) => state.userInfo
);
