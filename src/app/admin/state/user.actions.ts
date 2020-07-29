import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOGIN = "[User] Login",
  LOGIN_SUCCESS = "[USER] Login Success",
  LoginFail = "[User] Login Fail",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout",
  LOAD_PROFILE_BEGIN = "[User] Load Profile begin",
  LOAD_PROFILE_SUCCESS = "[User] Load Profile Success",
  LOAD_PROFILE_FAILURE = "[User] Load Profile failure",
}
