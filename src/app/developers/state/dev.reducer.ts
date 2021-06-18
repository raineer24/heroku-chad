import { User } from "../../core/models/user";
import * as fromRoot from "../../state/app.state";
import { DevActions, DevActionTypes } from "./dev.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
export interface DevState extends EntityState<User> {
  selectedDevId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  // profile: any;
  developer: User | null;
}

export interface State extends fromRoot.AppState {
  dev: DevState;
}

export const devAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultDev: DevState = {
  ids: [],
  entities: {},
  selectedDevId: null,
  loading: false,
  loaded: false,
  error: "",
  developer: null,
  //user: null,
};

export const initialState = devAdapter.getInitialState(defaultDev);

// export interface DevState {
//   selectedUser: User;
//   loading: boolean;
//   //userprofile: User | null;
//   user: null;
//   // is a user authenticated?
//   isAuthenticated: boolean;
//   // if authenticated, there should be a user object
//   developer: User | null;
//   // error message
//   errorMessage: null;
//   id: null;

//   //userprofile: User | null;
// }

// const initialState: DevState = {
//   isAuthenticated: false,
//   developer: null,
//   errorMessage: null,
//   id: null,
//   selectedUser: null,
//   loading: false,
//   //userprofile: null,
// };

// Selector functions
const getDevFeatureState = createFeatureSelector<DevState>("dev");

// export const getError = createSelector(getDevFeatureState, (state) => {
//   console.log(state);

//   return state.errorMessage;
// });

export const getProfile = (state: DevState) => state.developer;

export const getUserProfile = createSelector(getDevFeatureState, (state) => {
  console.log("state", state.developer);
  return state.developer;
});

// export const routerState = createSelector(
//   (state: State) => state.router,
//   (value) => valueevelopers/developers-list.component
// );

// export const getUserProfile = createSelector(
//   (state: State) => state.users,
//   (user) => user
// );

export function reducer(state = initialState, action: DevActions): DevState {
  switch (action.type) {
    case DevActionTypes.LOAD_DEVELOPERS_SUCCESS: {
      console.log("state");
      console.log("actions", action.payload);
      return { ...state, developer: action.payload };
    }
    default:
      return state;
  }
}
export const getAllDevelopers = createSelector(
  getDevFeatureState,
  devAdapter.getSelectors().selectAll
);
