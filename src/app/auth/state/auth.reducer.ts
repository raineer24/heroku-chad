import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { AuthActions, AuthActionTypes } from "./auth.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";

export interface State extends fromRoot.AppState {
  auth: AuthState;
}

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: null;
  id: null;
  selectedUser: User;
  loading: boolean;
  //userprofile: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  id: null,
  selectedUser: null,
  loading: false,
  //userprofile: null,
};

// Selector functions
const getAuthFeatureState = createFeatureSelector<AuthState>("auth");

export const getError = createSelector(getAuthFeatureState, (state) => {
  console.log(state);

  return state.errorMessage;
});

export const getProfile = (state: AuthState) => state.user;

export const getUserProfile = createSelector(getAuthFeatureState, (state) => {
  console.log("state", state.user);
  return state.user;
});

// export const routerState = createSelector(
//   (state: State) => state.router,
//   (value) => value
// );

// export const getUserProfile = createSelector(
//   (state: State) => state.users,
//   (user) => user
// );

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOAD_PROFILE_BEGIN: {
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
      };
    }
    case AuthActionTypes.LOAD_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    }

    case AuthActionTypes.LOAD_PROFILE_SUCCESS: {
      //console.log(state);

      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        user: action.payload,
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
        },
        errorMessage: null,
      };

    case AuthActionTypes.LoginFail:
      //  console.log("state");
      const id = uuidv4();
      // console.log(action.payload);
      return {
        ...state,
        id,
        errorMessage: action.payload,
      };

    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
        },
        errorMessage: null,
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
}
