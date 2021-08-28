import * as userActions from "../actions/user.actions";
import { User } from "../../core/models";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface State {
  userInfo: User;
  isLoading: boolean;
  showError: boolean;
  error: string;
}

//  id?: any;
//   email?: string;
//   password?: string;
//   token?: string;
//   user_profile?: Array<any>;
//   // user_profile: EntityState<UserFetch>;
//   bio?: string;

export const initialState: State = {
  userInfo: {
    id: 0,
    email: "",
    username: "",
    first_name: "",
  },
  isLoading: false,
  showError: false,
  error: "",
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case userActions.UserActionTypes.GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case userActions.UserActionTypes.GET_USER_SUCCESS:
      //action.payload.profileImageUrl += '?'+ new Date().getMilliseconds();
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case userActions.UserActionTypes.GET_USER_FAIL:
      return {
        ...state,
        showError: true,
        error: "Oopss.. an error has occured.",
        isLoading: false,
      };
    default: {
      return state;
    }
  }
}

export const getUserState = createFeatureSelector<State>("user");
