import { Injectable } from "@angular/core";

import { Observable, of, merge } from "rxjs";
import { mergeMap, switchMap, map, catchError } from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../state/user.action";

@Injectable()
export class UserEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LOGIN),
    map((action: userActions.LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.login(payload.email, payload.password).pipe(
        map((user) => {
          console.log("user", user.token);
          return new userActions.LogInSuccess({
            token: user.token,
            email: payload.email,
          });
        }),
        catchError((err) => of(new userActions.LoginFail(err)))
      );
    })
  );
}
