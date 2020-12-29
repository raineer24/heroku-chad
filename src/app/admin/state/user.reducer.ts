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
}

export interface State extends fromRoot.AppState {
  user: UsersState;
}

//export const employeeAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const userAdapter: EntityAdapter<UserFetch> = createEntityAdapter<UserFetch>();

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
    case UserActionTypes.LOAD_PROFILE_SUCCESS: {
      let actions = action.payload;
      console.log("action.payload", actions);

      return userAdapter.addOne(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedUserId: action.payload.id,
      });
    }

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
