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
import * as fromUser from "../../admin/state../../state/user.reducer";
import { AuthService } from "../../core/services/user.service";
import { AlertService } from "../../core/services/alert.service";
import * as UserActions from "./user.actions";
import { Store, select, ActionsSubject } from "@ngrx/store";
/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
//import * as AuthActions from "./auth.action";
import { User } from "src/app/core/models/user";
import * as userActions from "../state/user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private store: Store<fromUser.State>,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) {}

  @Effect()
  deleteEduProfile: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_EDU_PROFILE),
    map((action: UserActions.deleteExpProfile) => action.payload),
    switchMap((payload) => {
      //  console.log("payload create EXPERIENCE: ", payload);
      return this.authService.deleteEdu(payload).pipe(
        take(1),
        map((user) => {
          console.log("delete Education EFFECT: ", user);

          // let data = user.profileEduCreate;

          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", user.body);

          return new UserActions.deleteEduProfileSuccess(user);
        }),
        catchError((err) => of(new UserActions.deleteEduProfileFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  deleteEduProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_EDU_PROFILE_SUCCESS),
    tap((user) => {
      this.store.dispatch(new userActions.LoadProfileBegin());
    })
  );

  @Effect({ dispatch: false })
  deleteExpProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_EXP_PROFILE_SUCCESS),
    tap((user) => {
      this.store.dispatch(new userActions.LoadProfileBegin());
    })
  );

  @Effect()
  deleteExpProfile: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_EXP_PROFILE),
    map((action: UserActions.deleteExpProfile) => action.payload),
    switchMap((payload) => {
      //  console.log("payload create EXPERIENCE: ", payload);
      return this.authService.deleteExp(payload).pipe(
        take(1),
        map((user) => {
          console.log("delete EXPERIENCCE EFFECT: ", user);

          // let data = user.profileEduCreate;

          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", user.body);

          return new UserActions.deleteExpProfileSuccess(user);
        }),
        catchError((err) => of(new UserActions.deleteEduProfileFail(err)))
      );
    })
  );

  @Effect()
  createEducation: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EDU_PROFILE),
    map((action: UserActions.createEduProfile) => action.payload),
    switchMap((payload) => {
      //  console.log("payload create EXPERIENCE: ", payload);
      return this.authService.createEdu(payload).pipe(
        take(1),
        map((user) => {
          console.log("create EDUCATION EFFECT: ", user);

          let data = user.profileEduCreate;

          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", user.body);

          return new UserActions.createEduProfileSuccess(data);
        }),
        catchError((err) => of(new UserActions.createEduFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  createEduSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EDU_PROFILE_SUCCESS),
    tap((user) => {
      console.log("effects experience profile success!");
      // localStorage.setItem("token", user.payload.token);
      // localStorage.setItem("currentUser", JSON.stringify(user));
      // this.currentUserSubject.next(user);
      this.router.navigateByUrl("/");
      // console.log("get profile success: ", user);
      this.alertService.success("create Experience Profile Success", true);
      console.log("data experience profile success: ", user);
    })
  );

  @Effect()
  createExperience: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EXP_PROFILE),
    map((action: UserActions.createExpProfile) => action.payload),
    switchMap((payload) => {
      console.log("payload create EXPERIENCE: ", payload);
      return this.authService.createExp(payload).pipe(
        take(1),
        map((user) => {
          console.log("create experience EFFECT: ", user.profileExpCreate);

          let data = user.profileExpCreate;

          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", user.body);

          return new UserActions.createExpProfileeSuccess(data);
        }),
        catchError((err) => of(new UserActions.createExpProfileFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  createExpProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EXP_PROFILE_SUCCESS),
    tap((user) => {
      console.log("effects experience profile success!");
      // localStorage.setItem("token", user.payload.token);
      // localStorage.setItem("currentUser", JSON.stringify(user));
      // this.currentUserSubject.next(user);
      this.router.navigateByUrl("/");
      // console.log("get profile success: ", user);
      this.alertService.success("create Experience Profile Success", true);
      console.log("data experience profile success: ", user);
    })
  );

  @Effect({ dispatch: false })
  updateProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_PROFILE_SUCCESS),
    tap((user) => {
      console.log("effects UPDATE profile success!");
      // localStorage.setItem("token", user.payload.token);
      // localStorage.setItem("currentUser", JSON.stringify(user));
      // this.currentUserSubject.next(user);
      this.router.navigateByUrl("/");
      // console.log("get profile success: ", user);
      this.alertService.success("Updated Profile Success", true);
      console.log("data update profile success: ", user);
    })
  );

  @Effect()
  getProfile: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_PROFILE),
    map((action: UserActions.createProfile) => action.payload),
    switchMap((payload) => {
      console.log("payload create profile: ", payload);
      return this.authService.createProfile(payload).pipe(
        take(1),
        map((user) => {
          console.log("get profile effect", user.profileCreate);

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
          return new UserActions.createProfileSuccess(user.profileCreate);
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

          //    console.log("map effect");
          return new UserActions.LoadProfileSuccess(data.user);
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
