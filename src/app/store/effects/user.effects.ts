import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { act, Actions, Effect, ofType } from "@ngrx/effects";
import {
  mergeMap,
  switchMap,
  map,
  catchError,
  tap,
  concatMap,
  flatMap,
  take,
  withLatestFrom,
  debounceTime,
} from "rxjs/operators";
import { Action, Store } from "@ngrx/store";
import { combineLatest, from, Observable, of } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import { State } from "../reducers/user.reducer";

import * as userInfoActions from "../actions/user.actions";
import { userInfo } from "os";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

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

  //   getDoc$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(fromDocs.getDocument),
  //       switchMap(action =>
  //         of(action).pipe(
  //           withLatestFrom(
  //             this.store.select(fromDocs.getById, { id: action.payload.id })
  //           ),
  //           map(([action, latest]) => {
  //             return fromDocs.someAction();
  //           })
  //         )
  //       )
  //     );
  //   });

  // @Effect()
  // getInventory$ = this.actions$.pipe(
  //   ofType(GET_INVENTORY),
  //   mergeMap((action) =>
  //     combineLatest(
  //       of(action),
  //       this.store$.pipe(
  //         select(getIsStoreInventoryLoaded, { branchId: action.branchId })
  //       )
  //     )
  //   ),
  //   tap(([action, loaded]) => {
  //     // The rest of your code...
  //   })
  // );

  // @Effect()
  //   getSomething$ = this.actions$.pipe(
  //       ofType<GetMyRecords>(MyType.GET_RECORDS),bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
  //       debounceTime(0),
  //       withLatestFrom(this.store.select(getId)),
  //       switchMap(([action, id]) => {
  //           this.log.debug('Get ID', id);
  //           ... calling my service here
  //       })
  //   );

  @Effect() onGetUserInfo = this.actions.pipe(
    ofType<userInfoActions.GetUserAction>(
      userInfoActions.UserActionTypes.GET_USER
    ),
    debounceTime(0),
    withLatestFrom(this.store.select((p) => p["userInfo"])),
    mergeMap(([action, state]) => {
      if (state.id === action.payload.id) {
        return of({ type: "NO_ACTION" });
      }
      return this.authService.getUser(action.payload.id).pipe(
        concatMap((data) => {
          return from([
            { type: "CLEAR_PROFILE_STATE" },
            new userInfoActions.GetUserSuccessAction(data),
          ]);
        }),
        catchError((err) =>
          of(new userInfoActions.GetUserFailAction({ showError: true }))
        )
      );
    })
  );
  //   @Effect() onGetUserInfo$ = this.actions$
  //     .ofType<userInfoActions.GetUserAction>(
  //       userInfoActions.UserActionTypes.GET_USER
  //     )
  //     .withLatestFrom(this.store.select((p) => p["profile"]))
  //     .mergeMap(([action, state]) => {
  //       // If Username Is not changed dont fetch data
  //       if (state.userInfo.userInfo.username === action.payload.userName) {
  //         return Observable.of({ type: "NO_ACTION" });
  //       }
  //       return this.userInfoService
  //         .GetUserInfo(action.payload.userName)
  //         .concatMap((data) => {
  //           this.seoService.updateUserPage(data.value);
  //           return Observable.from([
  //             { type: "CLEAR_PROFILE_STATE" },
  //             new userInfoActions.GetUserSuccessAction(data.value),
  //             new interestActions.GetInterestAction({
  //               userName: action.payload.userName,
  //             }),
  //           ]);
  //         })
  //         .catch((error) => {
  //           return Observable.of(
  //             new userInfoActions.GetUserFailAction({ showError: true })
  //           );
  //         });
  //     });
}
