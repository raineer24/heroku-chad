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
import { State } from "../reducers/user.reducer";

import * as userInfoActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect() onGetUserInfo = this.actions.pipe(
    ofType<userInfoActions.GetUserAction>(
      userInfoActions.UserActionTypes.GET_USER
    ),
    debounceTime(0),
    withLatestFrom(this.store.select((p) => p["userInfo"])),
    switchMap(([action, state]) => {
      return this.authService.getUser(action.payload.id).pipe(
        concatMap((data) => {
          console.log("data", data);
          return from([
            { type: "CLEAR_PROFILE_STATE" },
            new userInfoActions.GetUserSuccessAction(data),
          ]);
        }),
        catchError((err) =>
          of(new userInfoActions.GetUserFailAction({ showError: true }))
        )
      );
    })
  );
}
