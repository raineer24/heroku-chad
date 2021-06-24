import { User } from "../../core/models/user";
//import * as fromRoot from "../../state/app.state";
import { DevActions, DevActionTypes } from "./user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface UserState {
  users: User[];
  selectedUser: User | null;
}

export const initialState: UserState = {
  users: null,
  selectedUser: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export function userReducer(
  state = initialState,
  action: DevActions
): UserState {
  switch (action.type) {
    case DevActionTypes.LOAD_DEVELOPERS_SUCCESS: {
      console.log("state");
      console.log("actions", action.payload);
      return { ...state, users: action.payload };
    }
    case DevActionTypes.SELECT_USER: {
      return { ...state, selectedUser: Object.assign({}, action.payload) };
    }
    default: {
      return state;
    }
  }
}
