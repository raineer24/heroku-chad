import { User } from "../../core/models/user";

export interface UserState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PRODUCT_CODE":
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
