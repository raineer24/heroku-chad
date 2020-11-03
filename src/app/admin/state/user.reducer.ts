import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { UserActions, UserActionTypes } from "../state/user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State extends fromRoot.State {
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

    case UserActionTypes.UPDATE_INFO: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    } //This action will update the loading status. Dont need to allocate its selector as it is already done in app component.
    case UserActionTypes.UPDATE_SUCCESS: {
      return addressBookAdapter.setOne(action.payload.item, {
        ...state,
        loading: false,
        error: null,
      });
    }

    default:
      return state;
  }
}
