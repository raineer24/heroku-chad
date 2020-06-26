import { User } from "../../core/models/user";
import * as fromRoot from "../../../app/state/app.state";

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

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
