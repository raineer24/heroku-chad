// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer,
// } from "@ngrx/store";

// import * as fromAuth from "../../auth/state/auth.reducer";
// import * as fromUser from "../../admin/state/user.reducer";
// //import * as fromDev from "../../developers/state/dev.reducer";
// export interface AppState {
//   auth: fromAuth.AuthState;
//   users: fromUser.UserState;
//   // dev: fromDev.State;
// }

// export const reducers: ActionReducerMap<AppState> = {
//   //dev: fromDev.reducer,
//   auth: fromAuth.authReducer,
//   users: fromUser.userReducer,
// };

// // export const getAppState = createFeatureSelector<AppState>("auth");

// // export const getAuthState = createSelector(
// //   getAppState,
// //   (state: AppState) => state.auth
// // );
// // export const getAuthenticateStatus = createSelector(
// //   getAuthState,
// //   fromAuth.getAuthStatus
// // );

// // La première fonction amène vers le state matieres
// export const selectUserListState$ = (state: AppState) => state.auth;
// // export const selectAuthListState$ = (state: State) => state.auth;
// // export const selectUsersLoaded$ = createSelector(
// //   selectUserListState$,
// //   (user$) => user$.loaded
// // );
// // export const selectUserLoaded$ = createSelector(
// //   selectUserListState$,
// //   (user) => user.selectedUser
// // );
