import { Posts } from "../../core/models/posts";

// State for this feature (User)
export interface PostsState {
  maskUserName: boolean;
  currentUser: Posts;
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
