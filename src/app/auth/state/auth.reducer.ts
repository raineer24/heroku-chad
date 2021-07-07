import { User } from "../../core/models/user";
//import * as fromRoot from "../../state/app.state";
import { AuthActions, AuthActionTypes } from "./auth.action";
import { v4 as uuidv4 } from "uuid";
import * as fromRoot from "../../store/reducers";
import { loginComplete, signupSuccess } from "./auth.action";

import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  createAction,
  props,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

// export interface State extends fromRoot.AppState {
//   auth: AuthState;
// }

export interface AuthState extends EntityState<User> {
  selectedAuthId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  user: User | null;
  isAuthenticated: boolean;
}

export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}
export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultEmployee: AuthState = {
  user: null,
  ids: [],
  entities: {},
  selectedAuthId: null,
  loading: false,
  loaded: false,
  error: "",
  isAuthenticated: false,
};

export const initialAuthState = authAdapter.getInitialState(defaultEmployee);

export const authReducer = createReducer(
  initialAuthState,
  on(loginComplete, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    loading: true,
    user: payload,
  })),
  on(signupSuccess, (state, { payload }) => ({
    ...state,
    selectedAuthId: payload,
    isAuthenticated: true,
    loading: true,
    user: payload,
  }))
);

// export const initialState: AuthState = {
//   isAuthenticated: false,
//   usere: null,
//   errorMessage: null,
//   id: null,
//   selectedUser: null,
//   loading: false,
//   //userprofile: null,
// };

// Selector functions

//export const getAuthStatus = (state: AuthState) => state.isAuthenticated;
