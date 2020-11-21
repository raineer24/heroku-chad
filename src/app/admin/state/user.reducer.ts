import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { UserActions, UserActionTypes } from "../state/user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

// export interface State extends fromRoot.State {
//   user: UsersState;
// }

import { UserFetch } from "../../core/models/userfetch";

export interface UsersState extends EntityState<User> {
  selectedUserProfileId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  user: UsersState;
}

export const userProfileAdapter: EntityAdapter<User> = createEntityAdapter<
  User
>();

// // State for this feature (User)
// export interface UsersState {
//   // maskUserName: boolean;
//   // currentUser: User;
//   user: User | null;
//   loading: boolean;pinay
//   errorMessage: any;
// }

// const initialState: UsersState = {
//   user: null,
//   loading: false,
//   errorMessage: null,
// };

export const defaultUserProfile: UsersState = {
  ids: [],
  entities: {},
  selectedUserProfileId: null,
  loading: false,
  loaded: false,
  error: "",
};

export const initialState = userProfileAdapter.getInitialState(
  defaultUserProfile
);

// Selector functions
const getUserFeatureState = createFeatureSelector<UsersState>("users");

export function userReducer(
  state = initialState,
  action: UserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.LOAD_PROFILE_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionTypes.LOAD_PROFILE_SUCCESS: {
      console.log("action.payload.id", action.payload);

      return userProfileAdapter.addOne(action.payload, {
        ...state,
        selectedEmployeeId: action.payload.id,
      });
    }
  }
}

// export function employeeReducer(
//   state = initialState,
//   action: employeeActions.Action
// ): EmployeeState {
//   switch (action.type) {
//     case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS: {
//       return employeeAdapter.addAll(action.payload, {
//         ...state,
//         loading: false,
//         loaded: true,
//       });
//     }

//     case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES_FAILURE: {
//       return {
//         ...state,
//         entities: {},
//         loading: false,
//         loaded: false,
//         error: action.payload,
//       };
//     }

//     case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEE_SUCCESS: {
//       return employeeAdapter.addOne(action.payload, {
//         ...state,
//         selectedEmployeeId: action.payload.id,
//       });
//     }

//     case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEE_FAILURE: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     case employeeActions.EmployeeActionTypes.CREATE_EMPLOYEE_SUCCESS: {
//       return employeeAdapter.addOne(action.payload, state);
//     }

//     case employeeActions.EmployeeActionTypes.CREATE_EMPLOYEE_FAILURE: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     case employeeActions.EmployeeActionTypes.UPDATE_EMPLOYEE_SUCCESS: {
//       return employeeAdapter.updateOne(action.payload, state);
//     }

//     case employeeActions.EmployeeActionTypes.UPDATE_EMPLOYEE_FAILURE: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     case employeeActions.EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS: {
//       return employeeAdapter.removeOne(action.payload, state);
//     }

//     case employeeActions.EmployeeActionTypes.DELETE_EMPLOYEE_FAILURE: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export const getCurrentElemployeeId = createSelector(
//   getEmployeeFeatureState,
//   (state: EmployeeState) => state.selectedEmployeeId
// );

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UsersState) => state.selectedUserProfileId
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state) => state.entities[state.selectedUserProfileId]
);

// export const getCurrentElemployee = createSelector(
//   getEmployeeFeatureState,
//   getCurrentElemployeeId,
//   (state) => state.entities[state.selectedEmployeeId]
// );

// export const getProfile = (state: UsersState) => state.user;

// export const getEmployees = createSelector(
//   getEmployeeFeatureState,
//   employeeAdapter.getSelectors().selectAll
// );

// export const getUserProfile = createSelector(getUserFeatureState, (state) => {
//   console.log("state", state.user);
//   return state.user;
// });

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
