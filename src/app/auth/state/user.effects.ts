import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, merge } from "rxjs";
import { mergeMap, switchMap, map, catchError, tap } from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../state/user.action";

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

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

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.SIGNUP),
    map((action: userActions.SignUp) => action.payload),
    switchMap((payload) => {
      return this.authService.registerUsers(payload).pipe(
        map((user) => {
          console.log("user", user);
          return new userActions.SignUpSuccess({ user });
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );
}
