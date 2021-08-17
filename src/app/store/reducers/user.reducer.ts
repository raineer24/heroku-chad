import { All, UserActionTypes } from "../actions/user.actions";
import { User } from "../../core/models";

export interface State {
  selectedUser: User | null;
  userList: User[] | null;
}

export const initialState: State = {
  selectedUser: null,
  userList: [],
};
export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
  }
}
