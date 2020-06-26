import { Injectable } from "@angular/core";

import { Observable, of, merge } from "rxjs";
import { mergeMap, switchMap, map } from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../state/user.action";

@Injectable()
export class UserEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  @Effect()
  // login$: Observable<Action> = this.actions$.pipe(
  //   ofType(userActions.UserActionTypes.LOGIN),
  //   map((action: userActions.LogIn) => action.payload), switchMap
  //   )

  // loadProducts$: Observable<Action> = this.actions$.pipe(
  //   ofType(productActions.ProductActionTypes.Load),
  //   mergeMap(action =>
  //     this.productService.getProducts().pipe(
  //       map(products => (new productActions.LoadSuccess(products))),
  //       catchError(err =userActions.UserActionTypes.LOGIN> of(new productActions.LoadFail(err)))
  //     )
  //   )
  // );
  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN))

    .map((action: LogIn) => action.payload)
    .switchMap((payload) => {
      return this.authService
        .login(payload.email, payload.password)
        .map((user) => {
          console.log("user", user.token);
          return new LogInSuccess({ token: user.token, email: payload.email });
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });
}
