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
import * as DevActions from "./dev.action";
import { User } from "src/app/core/models/user";

@Injectable()
export class DevEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) {}

  @Effect({ dispatch: false })
  loadDevelopers$: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.LOAD_DEVELOPERS),

    mergeMap(() => {
      return this.authService.getDevelopers().pipe(
        map((data) => {
          console.log("developer data:", data["user"]);
          let devs = data["user"];
          return new DevActions.loadDevelopersSuccessAction(data);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new DevActions.loadDevelopersFail(error)))
      );
    })
  );
}
