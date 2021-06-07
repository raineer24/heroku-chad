import { User, UserFetch } from "../../core/models";
import * as fromRoot from "../../state/app.state";
import { UserActions, UserActionTypes } from "../state/user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface UsersState extends EntityState<UserFetch> {
  selectedUserId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  profile: any;
}

export interface State extends fromRoot.AppState {
  user: UsersState;
}

//export const employeeAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const userAdapter: EntityAdapter<UserFetch> =
  createEntityAdapter<UserFetch>();

// export const defaultEmployee: EmployeeState = {
//   ids: [],
//   entities: {},
//   selectedEmployeeId: null,
//   loading: false,
//   loaded: false,
//   error: "",
// };

export const defaultUser: UsersState = {
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: "",
  profile: null,
};

// State for this feature (User)
// export interface UsersState {
//   // maskUserName: boolean;
//   // currentUser: User;
//   user: User | null;
//   loading: boolean;
//   errorMessage: any;
// }

//export const initialState = employeeAdapter.getInitialState(defaultEmployee);

export const initialState = userAdapter.getInitialState(defaultUser);

// const initialState: UsersState = {
//   user: null,
//   loading: false,
//   errorMessage: null,
// };

// Selector functions
const getUserFeatureState = createFeatureSelector<UsersState>("users");

//export const getProfile = (state: UsersState) => state.user;

// export const getUserProfile = createSelector(getUserFeatureState, (state) => {
//   console.log("state", state.user);
//   return state.user;
// });

export function userReducer(
  state = initialState,
  action: UserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.CREATE_EXP_PROFILE_SUCCESS: {
      //   console.log("action payload update profile success", action.payload);
      let actions = action.payload;
      console.log("actions payload exp", actions);
      //console.log("update profile SUCCESS", actions.changes["userp"]);
      //let entity = actions.changes["updated_user"][0];
      const entity = state.entities[state.selectedUserId].user_experience;

      // entity[index] = actions.changes["userp"];

      entity.push(actions);
      console.log("STATE: ", state);
      console.log("state EXP profile", state.entities[state.selectedUserId]);

      //return userAdapter.updateOne(action.payload, state);

      return {
        ...state, //copying the orignal state
      };
    }

    case UserActionTypes.CREATE_EXP_PROFILE: {
      //return Object.assign({}, state, { loading: true });
      //  console.log('state create profile: ', state.entities[state.selectedUserId]);
      console.log("state create experience", state);
      console.log("state.experience", action.payload);

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

    case UserActionTypes.UPDATE_PROFILE_SUCCESS: {
      const index = state.entities[state.selectedUserId].user_profile.findIndex(
        (entity) => entity.id !== action.payload
      );

      console.log("INDEX: ", index);

      //   console.log("action payload update profile success", action.payload);
      let actions = action.payload;
      console.log("actions payload", actions);
      console.log("update profile SUCCESS", actions.changes["userp"]);
      //let entity = actions.changes["updated_user"][0];
      const entity = state.entities[state.selectedUserId].user_profile;

      entity[index] = actions.changes["userp"];

      // entity.push(actions);
      console.log("STATE: ", state);
      console.log("state update profile", state.entities[state.selectedUserId]);

      //return userAdapter.updateOne(action.payload, state);

      return {
        ...state, //copying the orignal state
      };
    }

    case UserActionTypes.CREATE_PROFILE: {
      //return Object.assign({}, state, { loading: true });
      //  console.log('state create profile: ', state.entities[state.selectedUserId]);
      console.log("state create", state);
      console.log("state.profile", action.payload);

      // return {
      //   ...state,
      //  profile: action.payload

      // }

      return userAdapter.addOne(action.payload, {
        ...state,

        // profile: action.payload,
        profile: action.payload,
      });
    }

    case UserActionTypes.CREATE_PROFILE_SUCCESS: {
      //const index = state.entities.findIndex(entity => entity.id !== action.payload); //finding index of the item

      let actions = action.payload;

      console.log(
        "STATE PROFILE Success",
        state.entities[state.selectedUserId].user_profile
      );
      let entity = state.entities[state.selectedUserId].user_profile;
      entity.push(actions);
      // entity = actions;
      console.log("entity", entity);
      //const findIndex = entity.ind
      // console.log("action.payload create profile success reducer: ", actions);

      return userAdapter.addOne(action.payload, {
        ...state,
        // entity: actions
      });
    }

    case UserActionTypes.LOAD_PROFILE_SUCCESS: {
      let actions = action.payload;
      // console.log("action.payload", actions);
      // console.log("action.payload", actions);

      return userAdapter.addOne(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedUserId: action.payload.id,
      });
    }

    // case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS:
    //   return customerAdapter.updateOne(action.payload, state);

    // case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
}

// export function reducer(state = initialState, action: UserActions): UsersState {
//   switch (action.type) {
//     case UserActionTypes.LOAD_PROFILE_BEGIN: {
//       return {
//         ...state,
//         loading: true,
//       };
//     }
//     case UserActionTypes.LOAD_PROFILE_FAILURE: {
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.payload,
//       };
//     }

//     case UserActionTypes.LOAD_PROFILE_SUCCESS: {
//       console.log(state);

//       return {
//         ...state,
//         loading: true,
//         user: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// }

//export const getCurrentElemployee = createSelector(getUserFeatureState);

// export const getCurrentUserId = createSelector(
//   getUserFeatureState,
// )

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UsersState) => state.selectedUserId
);

// export const getCurrentElemployeeId = createSelector(
//   getEmployeeFeatureState,
//   (state: EmployeeState) => state.selectedEmployeeId
// );

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state) => state.entities[state.selectedUserId]
);

// export const getCurrentElemployee = createSelector(
//   getEmployeeFeatureState,
//   getCurrentElemployeeId,
//   (state) => state.entities[state.selectedEmployeeId]
// );
