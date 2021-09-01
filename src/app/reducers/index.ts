import { reducer, AuthState } from "../store/reducers/auth/auth.reducer";

import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from "@ngrx/store";

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: reducer,
};

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === "SET_ROOT_STATE") {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [stateSetter];
