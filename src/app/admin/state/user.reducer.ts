import { User } from "../../core/models/user";
//import * as fromRoot from "../../state/app.state";
import { DevActions, DevActionTypes } from "./user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface UserState {
  userse: User[];
  selectedUser: User | null;
}

export const initialState: UserState = {
  userse: null,
  selectedUser: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export function userReducer(
  state = initialState,
  action: DevActions
): UserState {
  switch (action.type) {
    case DevActionTypes.CREATE_DEVELOPER: {
      //return Object.assign({}, state, { loading: true });
      //  console.log('state create profile: ', state.entities[state.selectedUserId]);
      console.log("state create", state);
      console.log("state.profile", action.payload);

      // return {
      //   ...state,
      //  profile: action.payload

      // }

      // return userAdapter.addOne(action.payload, {
      //   ...state,

      //   // profile: action.payload,
      //   profile: action.payload,
      // });
    }
    case DevActionTypes.LOAD_DEVELOPERS_SUCCESS: {
      console.log("state");
      console.log("actions", action.payload);
      return { ...state, userse: action.payload };
    }

    case DevActionTypes.LOAD_DEVELOPER_SUCCESS: {
      console.log("state: ", state);

      return {
        ...state,
        //   loading: true,
        selectedUser: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
