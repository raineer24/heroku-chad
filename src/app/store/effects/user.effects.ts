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
import { Action, Store} from '@ngrx/store';
import { Observable, of } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import {  State } from '../reducers/user.reducer';


import * as userInfoActions from "../actions/user.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>,
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

  @Effect() onGetUserInfo$ = this.actions.pipe(
      ofType(userInfoActions.UserActionTypes.GET_USER)
  )
    // .ofType<userInfoActions.GetUserAction>(
    //   userInfoActions.UserActionTypes.GET_USER
    // )
    withLatestFrom(this.store.select((p) => p["profile"]))
    .mergeMap(([action, state]) => {
      // If Username Is not changed dont fetch data
      if (state.userInfo.userInfo.username === action.payload.userName) {
        return Observable.of({ type: "NO_ACTION" });
      }
      return this.userInfoService
        .GetUserInfo(action.payload.userName)
        .concatMap((data) => {
          this.seoService.updateUserPage(data.value);
          return Observable.from([
            { type: "CLEAR_PROFILE_STATE" },
            new userInfoActions.GetUserSuccessAction(data.value),
            new interestActions.GetInterestAction({
              userName: action.payload.userName,
            }),
          ]);
        })
        .catch((error) => {
          return Observable.of(
            new userInfoActions.GetUserFailAction({ showError: true })
          );
        });
    });

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
