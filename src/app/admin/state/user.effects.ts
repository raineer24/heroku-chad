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

    mergeMap(() => {
      return this.authService.getUserDetail().pipe(
        take(1),
        map((data) => {
          console.log("data", typeof data);

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
}
