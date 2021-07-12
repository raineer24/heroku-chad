import { User, UserFetch } from "../../core/models/";
//import * as fromRoot from "../../state/app.state";
import { DevActions, DevActionTypes } from "./user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromRoot from "../../store/reducers";

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

// export const defaultEmployee: UserState = {
//   ids: [],
//   entities: {},
//   selectedUserId: null,
//   loading: false,
//   loaded: false,
//   error: "",
//   user_profile: null,
// };

//export const initialState = userAdapter.getInitialState(defaultEmployee);

export const initialUserState: UserState = userAdapter.getInitialState({
  user: null,
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: "",
  user_profile: null,
});

export const userprofileAdapter: EntityAdapter<UserFetch> =
  createEntityAdapter<UserFetch>({
    selectId: (userprofile) => userprofile.id,
  });

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export function userReducer(
  state = initialUserState,
  action: DevActions
): UserState {
  switch (action.type) {
    case DevActionTypes.CREATE_DEVELOPER: {
      //return Object.assign({}, state, { loading: true });
      //  console.log('state create profile: ', state.entities[state.selectedUserId]);
      console.log("state create", state);
      console.log("state.profile", action.payload);

      // return userAdapter.updateOne(
      //   {
      //     id: state.entities[state.selectedUserId],
      //     changes: action.payload,
      //   },
      //   {
      //     ...state,
      //     loading: false,
      //   }
      // );

      // changes: {
      //   articles: articleAdapter.addOne(
      //     { sku: action.articleSku, amount: 1 },
      //     state.entities[action.customerId].articles
      //   );
      // }

      //       on(articleAdded, (state, action) =>
      //   adapter.updateOne(
      //     {
      //       id: action.customerId,
      //       changes: {
      //         articles: articleAdapter.addOne(
      //           { sku: action.articleSku, amount: 1 },
      //           state.entities[action.customerId].articles
      //         )
      //       }
      //     },
      //     state
      //   )
      // ),

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
      // return { ...state, userse: action.payload };
      return userAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case DevActionTypes.LOAD_DEVELOPER_SUCCESS: {
      console.log("state: ", state);
      return userAdapter.addOne(action.payload, {
        ...state,
        selectedUserId: action.payload.id,
      });
      // return {
      //   ...state,
      //   //   loading: true,
      //   selectedUserId: action.payload,
      // };
    }

    default: {
      return state;
    }
  }
}
