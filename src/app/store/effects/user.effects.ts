import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { act, Actions, Effect, ofType } from "@ngrx/effects";
import {
  mergeMap,
  switchMap,
  map,
  catchError,
  tap,
  concatMap,
  flatMap,
  take,
  withLatestFrom,
  debounceTime,
} from "rxjs/operators";
import { Action, Store } from "@ngrx/store";
import { combineLatest, from, Observable, of } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import { State } from "../../store/reducers/user";

import * as userInfoActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  // @Effect() onGetUserInfo = this.actions.pipe(
  //   ofType<userInfoActions.GetUserAction>(
  //     userInfoActions.UserActionTypes.GET_USER
  //   ),
  //   debounceTime(0),
  //   withLatestFrom(this.store.select((p) => p["userInfo"])),
  //   switchMap(([action, state]) => {
  //     return this.authService.getUser(action.payload.id).pipe(
  //       concatMap((data) => {
  //         console.log("data", data);
  //         return from([
  //           { type: "CLEAR_PROFILE_STATE" },
  //           new userInfoActions.GetUserSuccessAction(data),
  //         ]);
  //       }),
  //       catchError((err) =>
  //         of(new userInfoActions.GetUserFailAction({ showError: true }))
  //       )
  //     );
  //   })
  // );

  @Effect()
  onGetUserInfo = this.actions.pipe(
    ofType<userInfoActions.GetUserAction>(
      userInfoActions.UserActionTypes.GET_USER
    ),
    map((action: userInfoActions.GetUserAction) => action.payload),
    flatMap((payload) => {
      console.log("payload create profile: ", payload);
      return this.authService.getUser(payload.id).pipe(
        take(1),
        map((user) => {
          console.log("user: ", user);

          // let datus = normalize(user.profileCreate, userSchema);
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", datus);

          // let user_profile = user.body
          // this.currentUserSubject.next(user);
          // return new AuthActions.LogInSuccess({
          //   token: user.token,
          //   username: payload.username,
          //    firstName: user.firstName
          // });
          //return new AuthActions.LogInSuccess(user);
          // return new DevActions.createDeveloperSuccess(user.profileCreate);
          return new userInfoActions.GetUserSuccessAction(user);
        }),
        catchError((err) =>
          of(new userInfoActions.GetUserFailAction({ showError: true }))
        )
      );
    })
  );
}
