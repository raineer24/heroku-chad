import { User } from "../../core/models/user";
//import * as fromRoot from "../../state/app.state";
import { AuthActions, AuthActionTypes } from "./auth.action";
import { v4 as uuidv4 } from "uuid";
import * as fromRoot from "../../store/reducers";
import { loginComplete, signupSuccess } from "./auth.action";

import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  createAction,
  props,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

// export interface State extends fromRoot.AppState {
//   auth: AuthState;
// }

export interface AuthState extends EntityState<User> {
  selectedAuthId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  user: User | null;
  isAuthenticated: boolean;
}

export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}
export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();

// export const defaultEmployee: AuthState = {
//   user: null,
//   selectedAuthId: null,
//   loading: false,
//   loaded: false,
//   error: "",
//   isAuthenticated: false,
// };

//  export interface MessageState extends EntityState<Message> {
//    // additional entities state properties
//    selectedMessageId: number | null;
//    loaded: boolean;
//    loading: boolean;
//    saveMessage?: {
//      loaded: boolean;
//      loading: boolean;
//      msg?: Message;
//    };
//  }

//  export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>({
//    selectId: (msg: Message) => msg.messageId,
//  });

//  export const initialState: MessageState = adapter.getInitialState({
//    // additional entity state properties
//    selectedMessageId: null,
//    loaded: false,
//    loading: false,
//    saveMessage: {
//      loaded: false,
//      loading: false,
//    },
//  });

//export const initialAuthState = authAdapter.getInitialState(defaultEmployee);

export const initialAuthSate: AuthState = authAdapter.getInitialState({
  user: null,
  selectedAuthId: null,
  loading: false,
  loaded: false,
  error: "",
  isAuthenticated: false,
  user_profile: null,
});

export function authReducer(
  state = initialAuthSate,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOAD_PROFILE_BEGIN: {
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
      };
    }
    case AuthActionTypes.LOAD_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        //  errorMessage: action.payload,
      };
    }

    case AuthActionTypes.LOAD_PROFILE_SUCCESS: {
      //console.log(state);

      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        user: action.payload,
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,

        // errorMessage: null,
      };

    case AuthActionTypes.LoginFail:
      //  console.log("state");
      const id = uuidv4();
      // console.log(action.payload);
      return {
        ...state,
        //id,
        // errorMessage: action.payload,
      };

    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        //errorMessage: null,
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        //errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
}

// export const initialState: AuthState = {
//   isAuthenticated: false,
//   usere: null,
//   errorMessage: null,
//   id: null,
//   selectedUser: null,
//   loading: false,
//   //userprofile: null,
// };

// Selector functions

//export const getAuthStatus = (state: AuthState) => state.isAuthenticated;
