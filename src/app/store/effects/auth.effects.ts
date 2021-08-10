import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import { tap } from "rxjs/operators";
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

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN))
    .map((action: LogIn) => action.payload)
    .switchMap((payload) => {
      return this.authService
        .logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess(user);
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setToken(user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.notifyService.showError("Email/mot de passe incorrectes", "Erreur");
    })
  );
}
