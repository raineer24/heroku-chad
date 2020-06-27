import { User } from "../../core/models/user";
import * as fromRoot from "../../../app/state/app.state";
import { UserActions, UserActionTypes } from "../state/user.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.errorMessage
);

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
        },
      };

    case UserActionTypes.LoginFail:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}
