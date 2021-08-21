import { All, UserActionTypes } from "../actions/user.actions";
import { User } from "../../core/models";

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
    email: ""
  },
  isLoading: false,
  showError: false,
  error: "",
};
// export function userReducer(state = initialState, action: All): State {
//   switch (action.type) {
//     case UserActionTypes.LOAD_SUCCESS: {
//       return {
//         ...state,
//         selectedUser: action.payload,
//       };
//     }
//   }
}
