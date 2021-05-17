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
import { UserFetch } from "../../core/models";

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
  getProfile: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_PROFILE),
    map((action: UserActions.createProfile) => action.payload),
    switchMap((payload) => {
      return this.authService.createProfile(payload).pipe(
        take(1),
        map((user) => {
          console.log("get profile effect");
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            console.log("get profile Effect", user.body);

            // let user_profile = user.body
            // this.currentUserSubject.next(user);
            // return new AuthActions.LogInSuccess({
            //   token: user.token,
            //   username: payload.username,
            //    firstName: user.firstName
            // });
            //return new AuthActions.LogInSuccess(user);
            return new UserActions.createProfileSuccess(user.body);
          }
        }),
        catchError((err) => of(new UserActions.UpdateProfileFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  getProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_PROFILE_SUCCESS),
    tap((user) => {
      console.log("effects get profile success!");
      // localStorage.setItem("token", user.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      // this.currentUserSubject.next(user);
      this.router.navigateByUrl("/");
      console.log("get profile success: ", user);
      this.alertService.success("Profile Created", true);
      console.log("data", user);
    })
  );

  @Effect()
  loadProfile$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.LOAD_PROFILE_BEGIN),

    mergeMap(() => {
      return this.authService.getUserDetail().pipe(
        take(1),
        map((data) => {
          console.log("data effects", data);

          console.log("map effect");
          return new UserActions.LoadProfileSuccess(data);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new UserActions.LoadProfileFailure(error)))
      );
    })
  );

  // @Effect()
  // UpdateCustomer$: Observable<Action> = this.actions$.pipe(
  //   ofType<CustomerAction.UpdateCustomer>(
  //     CustomerAction.CustomerActionTypes.UPDATE_CUSTOMER
  //   ),
  //   map((action: CustomerAction.UpdateCustomer) => action.payload),
  //   mergeMap((customer: Customer) =>
  //     this.customerService.updateCustomer(customer).pipe(
  //       map(
  //         (updateCustomer: Customer) =>
  //           new CustomerAction.UpdateCustomerSuccess({
  //             id: updateCustomer.id,
  //             changes: updateCustomer,
  //           })
  //       ),
  //       catchError((err) => of(new CustomerAction.UpdateCustomerFail(err)))
  //     )
  //   )
  // );

  @Effect()
  UpdateProfile$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_PROFILE),
    map((action: UserActions.UpdateProfile) => action.payload),
    mergeMap((user: UserFetch) =>
      this.authService.updateProfile(user).pipe(
        map(
          (updateProfile: UserFetch) =>
            new UserActions.UpdateProfileSucess({
              id: updateProfile.id,
              changes: updateProfile,
            })
        ),
        catchError((err) => of(new UserActions.UpdateProfileFail(err)))
      )
    )
  );
}
