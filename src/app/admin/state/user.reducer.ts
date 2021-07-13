import { User, UserFetch } from "../../core/models/";
//import * as fromRoot from "../../state/app.state";
import { DevActions, DevActionTypes } from "./user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { normalize, denormalize, schema } from "normalizr";
import * as fromRoot from "../../store/reducers";

const userSchema = new schema.Entity("users");

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  loaded: boolean;
  entities: {};
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultEmployee: UserState = {
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: "",
  // user_profile: null,
};

export const initialState = userAdapter.getInitialState(defaultEmployee);

// export const initialUserState: UserState = userAdapter.getInitialState({
//   user: null,
//   selectedUserId: null,
//   loading: false,
//   loaded: false,
//   entities: {},
//   error: "",

//   user_profile: null,
// });

// export const userprofileAdapter: EntityAdapter<UserFetch> =
//   createEntityAdapter<UserFetch>({
//     selectId: (userprofile) => userprofile.id,
//   });

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>("users");

export function userReducer(
  state = initialState,
  action: DevActions
): UserState {
  switch (action.type) {
    case DevActionTypes.CREATE_DEVELOPER_SUCCESS: {
      console.log(
        "STATE PAYLOAD SUCCESS",
        state.entities[state.selectedUserId]
      );
      let datus = normalize(state.entities[state.selectedUserId], userSchema);
      console.log("normalize reducer", datus);
      console.log("action payload create success", action.payload);
      console.log(
        "state selecteduserid success",
        state.entities[state.selectedUserId].user_profile
      );

      let actions = action.payload;
      let entity = state.entities[state.selectedUserId].user_profile;
      entity.push(actions);
      console.log("entity:", entity);

      // return userAdapter.addOne(action.payload, {
      //   ...state,

      //   // profile: action.payload,
      //   // profile: action.payload,
      //     entities: action.payload,
      // });

      //  return featureAdapter.updateOne(
      //    {
      //      id: action.payload.routeId,
      //      changes: droneRoute,
      //    },
      //    state
      //  );

      return userAdapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
        },
        state
      );
    }
    case DevActionTypes.CREATE_DEVELOPER: {
      //return Object.assign({}, state, { loading: true });
      //  console.log('state create profile: ', state.entities[state.selectedUserId]);
      console.log("state create", state);
      console.log("state selecteduserid", state.entities[state.selectedUserId]);
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

      return userAdapter.addOne(action.payload, {
        ...state,

        // profile: action.payload,
        // profile: action.payload,
      });
    }
    case DevActionTypes.LOAD_DEVELOPERS_SUCCESS: {
      console.log("state");
      console.log("actions", action.payload);
      // return { ...state, userse: action.payload };
      // return userAdapter.addAll(action.payload, {
      //   ...state,
      //   loading: false,
      //   loaded: true,
      // });
    }

    case DevActionTypes.LOAD_DEVELOPER_SUCCESS: {
      // console.log("action sucess", action.payload.entities.users);
      console.log("state: ", state);
      // console.log("state: ", entities);
      return userAdapter.addOne(action.payload, {
        ...state,
        selectedUserId: action.payload.id,
        //  entities: action.payload.entities.users,
      });
      // return {
      //  // ...state,
      //   //   loading: true,
      //   //selectedUserId: action.payload,
      //   entities: action.payload.entities.users)
      // };
    }

    default: {
      return state;
    }
  }
}
