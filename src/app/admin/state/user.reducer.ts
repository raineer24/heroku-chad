import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { UserActions, UserActionTypes } from "../state/user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State extends fromRoot.AppState {
  user: UsersState;
}

// State for this feature (User)
export interface UsersState {
  // maskUserName: boolean;
  // currentUser: User;
  user: User | null;
  loading: boolean;
  errorMessage: any;
}

const initialState: UsersState = {
  user: null,
  loading: false,
  errorMessage: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UsersState>("users");

export const getProfile = (state: UsersState) => state.user;

export const getUserProfile = createSelector(getUserFeatureState, (state) => {
  console.log("state", state.user);
  return state.user;
});

export function reducer(state = initialState, action: UserActions): UsersState {
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

      return {
        ...state,
        loading: true,
        user: action.payload,
      };
    }

    default:
      return state;
  }
}

//export const getCurrentElemployee = createSelector(getUserFeatureState);

// export const getCurrentElemployeeId = createSelector(
//   getEmployeeFeatureState,
//   (state: EmployeeState) => state.selectedEmployeeId
// );

// export const getCurrentElemployee = createSelector(
//   getEmployeeFeatureState,
//   getCurrentElemployeeId,
//   (state) => state.entities[state.selectedEmployeeId]
// );
