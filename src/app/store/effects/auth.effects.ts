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
import { Observable } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  //   @Effect()
  //   LogIn: Observable<any> = this.actions
  //     .pipe(ofType(AuthActionTypes.LOGIN)),
  //     map((action: LogIn) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService
  //         .logIn(payload.email, payload.password)
  //         .map((user) => {
  //           return new LogInSuccess(user);
  //         })
  //         .catch((error) => {
  //           return Observable.of(new LogInFailure({ error: error }));
  //         });
  //     });

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.login(payload.email, payload.password);
    })
  );

  //   @Effect()
  //   LogIn: Observable<any> = this.actions$.pipe(
  //     ofType(AuthActions.AuthActionTypes.LOGIN),
  //     map((action: AuthActions.LogIn) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService.login(payload.email, payload.password).pipe(
  //         map((user) => {
  //           // console.log("user", user.token);
  //           return new AuthActions.LogInSuccess({
  //             token: user.token,
  //             email: payload.email,
  //           });
  //         }),
  //         catchError((err) => of(new AuthActions.LoginFail(err)))
  //       );
  //     })
  //   );

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
}
