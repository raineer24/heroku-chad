import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, merge, BehaviorSubject } from "rxjs";
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
import * as userActions from "../../admin/state/user.actions";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { User } from "src/app/core/models/user";

@Injectable()
export class AuthEffects {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //   @Effect({ dispatch: false })
  //   loadProfile$: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.LOAD_PROFILE_BEGIN),

  //     switchMap(() => {
  //       return this.authService.currentUser.pipe(
  //         take(1),
  //         map((data) => {
  //           console.log("map effect");
  //           return new AuthActions.LoadProfileSuccess(data);
  //           //return new userActions.LoadProfileSuccess(data["user"]);
  //         }),
  //         catchError((error) => of(new AuthActions.LoadProfileFailure(error)))
  //       );
  //     })
  //   );

  //   @Effect()
  //   LogIn: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.LOGIN),
  //     map((action: AuthActions.LogIn) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService.login(payload.email, payload.password).pipe(
  //         map((user) => {
  //           console.log("user", user);
  //           localStorage.setItem("currentUser", JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //           return new AuthActions.LogInSuccess(user);
  //         }),
  //         catchError((err) => of(new AuthActions.LoginFail(err)))
  //       );
  //     })
  //   );

  //   @Effect({ dispatch: false })
  //   LogInSuccess: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
  //     tap((user) => {
  //       console.log("user", user);
  //       localStorage.setItem("token", user.payload.token);
  //       this.router.navigateByUrl("/admin");
  //     })
  //   );

  //   @Effect()
  //   SignUp: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.SIGNUP),
  //     map((action: AuthActions.SignUp) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService.registerUsers(payload).pipe(
  //         map((user) => {
  //           console.log("user", user);
  //           this.router.navigate(["/auth/login"]);
  //           return new AuthActions.SignUpSuccess({ user });
  //         }),
  //         catchError((error) =>
  //           of(new AuthActions.SignUpFailure({ error: error }))
  //         )
  //       );
  //     })
  //   );

  //   @Effect({ dispatch: false })
  //   SignUpSuccess: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.SIGNUP_SUCCESS),
  //     tap((user) => {
  //       console.log("user", user);
  //       localStorage.setItem("token", user.payload.token);
  //       this.router.navigateByUrl("/");
  //     })
  //   );

  //   @Effect({ dispatch: false })
  //   SignUpFailure: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.SIGNUP_FAILURE)
  //   );

  //   @Effect({ dispatch: false })
  //   public LogOut: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.LOGOUT),
  //     tap((user) => {
  //       localStorage.removeItem("currentUser");
  //       this.router.navigate(["/auth/login"]);
  //     })
  //   );
}
