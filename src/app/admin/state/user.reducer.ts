import { User } from "../../core/models/user";

// State for this feature (User)
export interface UsersState {
  // maskUserName: boolean;
  // currentUser: User;
}

export function reducer(state, action) {
  switch (action.type) {
    case "POST_STORE":
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
