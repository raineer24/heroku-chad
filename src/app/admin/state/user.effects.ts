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
import * as UserActions from "./user.actions";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
//import * as AuthActions from "./auth.action";
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
    ofType(UserActions.UserActionTypes.LOAD_PROFILE_BEGIN),

    flatMap(() => {
      return this.authService.getUserDetail().pipe(
        take(1),
        map((data) => {
          console.log("data", data);

          console.log("map effect");
          return new UserActions.LoadProfileSuccess(data);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new UserActions.LoadProfileFailure(error)))
      );
    })
  );
}
