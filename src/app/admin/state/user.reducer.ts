import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { UserActions, UserActionTypes } from "../state/user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

// export interface State extends fromRoot.State {
//   user: UsersState;
// }

import { UserFetch } from "../../core/models/userfetch";

export interface UsersState extends EntityState<UserFetch> {
  selectedUserProfileId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  user: UsersState;
}

export const userProfileAdapter: EntityAdapter<UserFetch> = createEntityAdapter<
  UserFetch
>();

// // State for this feature (User)
// export interface UsersState {
//   // maskUserName: boolean;
//   // currentUser: User;
//   user: User | null;
//   loading: boolean;pinay
//   errorMessage: any;
// }

// const initialState: UsersState = {
//   user: null,
//   loading: false,
//   errorMessage: null,
// };

export const defaultUserProfile: UsersState = {
  ids: [],
  entities: {},
  selectedUserProfileId: null,
  loading: false,
  loaded: false,
  error: "",
};

export const initialState = userProfileAdapter.getInitialState(
  defaultUserProfile
);

// Selector functions
const getUserFeatureState = createFeatureSelector<UsersState>("users");

export function userReducer(
  state = initialState,
  action: UserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.LOAD_PROFILE_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionTypes.LOAD_PROFILE_SUCCESS: {
      return userProfileAdapter.addOne(action.payload, {
        ...state,
        selectedEmployeeId: action.payload.id,
      });
    }
  }
}

// export const getProfile = (state: UsersState) => state.user;

// export const getEmployees = createSelector(
//   getEmployeeFeatureState,
//   employeeAdapter.getSelectors().selectAll
// );

// export const getUserProfile = createSelector(getUserFeatureState, (state) => {
//   console.log("state", state.user);
//   return state.user;
// });

// export function reducer(state = initialState, action: UserActions): UsersState {
//   switch (action.type) {
//     case UserActionTypes.LOAD_PROFILE_BEGIN: {
//       return {
//         ...state,
//         loading: true,
//       };
//     }
//     case UserActionTypes.LOAD_PROFILE_FAILURE: {
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.payload,
//       };
//     }

//     case UserActionTypes.LOAD_PROFILE_SUCCESS: {
//       console.log(state);

//       return {
//         ...state,
//         loading: true,
//         user: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// }
