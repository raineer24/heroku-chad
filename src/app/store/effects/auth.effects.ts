import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
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
import { Observable, of } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.login(payload.email, payload.password).pipe(
        map((user) => {
          return new LogInSuccess(user);
        }),
        catchError((err) => of(new LogInFailure(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem("currentUser");
      this.router.navigate(["/auth/login"]);
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      // this.authService.setToken(user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      //  this.notifyService.showError("Email/mot de passe incorrectes", "Erreur");
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload) => {
      return this.authService.registerUsers(payload).pipe(
        map((user) => {
          console.log("user", user);
          this.router.navigate(["/auth/login"]);
          // return new AuthActions.SignUpSuccess({ user });
          return new SignUpSuccess(user);
        }),
        catchError((err) => of(new SignUpFailure(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  // @Effect()
  // SignUp: Observable<any> = this.actions
  //   .pipe(ofType(AuthActionTypes.SIGNUP))
  //   .map((action: SignUp) => action.payload)
  //   .switchMap((payload) => {
  //     return this.authService
  //       .signUp(payload)
  //       .map((response) => {
  //         return new SignUpSuccess(response);
  //       })
  //       .catch((response) => {
  //         return Observable.of(new SignUpFailure(response.error));
  //       });
  //   });
}
