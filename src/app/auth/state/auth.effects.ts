import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, merge } from "rxjs";
import {
  mergeMap,
  switchMap,
  map,
  catchError,
  tap,
  concatMap,
  flatMap,
  take,
} from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";
import { AlertService } from "../../core/services/alert.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
import * as userActions from "./auth.action";
import { User } from "src/app/core/models/user";

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) {}

  @Effect()
  loadProfile$: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LOAD_PROFILE_BEGIN),

    switchMap(() => {
      return this.authService.getUserDetail().pipe(
        take(1),
        map((data) => {
          console.log("map effect");
          return new userActions.LoadProfileSuccess(data);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new userActions.LoadProfileFailure(error)))
      );
    })
  );

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
          this.router.navigate(["/auth/login"]);
          return new userActions.SignUpSuccess({ user });
        }),
        catchError((error) =>
          of(new userActions.SignUpFailure({ error: error }))
        )
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

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem("token");
    })
  );
}
