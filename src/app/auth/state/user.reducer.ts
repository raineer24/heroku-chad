import { User } from "../../core/models/user";
import * as fromRoot from "../../../app/state/app.state";
import { UserActions, UserActionTypes } from "../state/user.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: null;
  id: null;
  selectedUser: User;
  loading: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  id: null,
  selectedUser: null,
  loading: false,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export const getError = createSelector(getUserFeatureState, (state) => {
  console.log(state);

  return state.errorMessage;
});

export const getProfile = createSelector(getUserFeatureState, (state) => {
  console.log(state);

  return state.user;
});

//export const getProfile = (state: UserState) => state.user;

// export const getUserProfile = createSelector(
//   getUserFeatureState,
//   (state: any) => {
//     console.log(state.user);
//     return state.user;
//   }
// );

export const getUserProfile = createSelector(
  getUserFeatureState,
  (state: any) => {
    console.log(state);
    return state.user;
  }
);

// export const routerState = createSelector(
//   (state: State) => state.router,
//   (value) => value
// );

// export const getUserProfile = createSelector(
//   (state: State) => state.users,
//   (user) => user
// );

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_PROFILE_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionTypes.LOAD_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    }

    case UserActionTypes.LOAD_PROFILE_SUCCESS: {
      console.log(state);

      // return {
      //   ...state,
      //   isAuthenticated: true,
      //   loading: true,
      //   user: action.payload,
      // };
      return Object.assign({}, state, {
        users: action.payload,
      });
    }

    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
        },
        errorMessage: null,
      };

    case UserActionTypes.LoginFail:
      //  console.log("state");
      const id = uuidv4();
      // console.log(action.payload);
      return {
        ...state,
        id,
        errorMessage: action.payload,
      };

    case UserActionTypes.SIGNUP_SUCCESS: {
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

    case UserActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
}
