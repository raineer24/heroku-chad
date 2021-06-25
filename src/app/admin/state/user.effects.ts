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
import * as DevActions from "./user.actions";
import { User } from "src/app/core/models/user";
import * as fromRoot from "../../store/reducers/index";
import { Store, select, ActionsSubject } from "@ngrx/store";
@Injectable()
export class DevEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService,
    private store: Store<fromRoot.AppState>
  ) {}

  @Effect()
  loadDevelopers$: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.LOAD_DEVELOPERS),

    concatMap(() => {
      return this.authService.getDevelopers().pipe(
        map((data) => {
          console.log("developer data:", data["user"]);
          let devs = data["user"];
          return new DevActions.loadDevelopersSuccessAction(data["user"]);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new DevActions.loadDevelopersFail(error)))
      );
    })
  );

  // @Effect({ dispatch: false })
  // getProfileSuccess: Observable<any> = this.actions$.pipe(
  //   ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_BEGIN),
  //   tap((user) => {
  //     const data = JSON.parse(localStorage.getItem("currentUser"));
  //     console.log("user", data.user);
  //     this.store.dispatch(new DevActions.LoadDeveloperSuccess(data.user));
  //   })
  // );

  // @Effect({ dispatch: false })
  // loadDevelopersSuccess$: Observable<any> = this.actions$.pipe(
  //   ofType(DevActions.DevActionTypes.LOAD_DEVELOPERS_SUCCESS),
  //   tap((user) => {
  //     // this.store.dispatch(new userActions.LoadProfileBegin());
  //     console.log("user load developer SUCCESS", user);
  //   })
  // );

  @Effect({ dispatch: false })
  loadDeveloper$: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_BEGIN),

    switchMap(() => {
      return this.authService.getUserDetail().pipe(
        take(1),
        map((data) => {
          console.log("map effect", data["user"]);
          this.store.dispatch(new DevActions.LoadDeveloperSuccess(data.user));
          // return new DevActions.LoadDeveloperSuccess(data["user"]);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new DevActions.loadDevelopersFail(error)))
      );
    })
  );
}
