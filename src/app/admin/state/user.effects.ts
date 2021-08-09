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
  startWith,
} from "rxjs/operators";
import { normalize, denormalize, schema } from "normalizr";

import { AuthService } from "../../core/services/user.service";
import { AlertService } from "../../core/services/alert.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
import * as DevActions from "./user.actions";
import { User, UserFetch } from "src/app/core/models/";
//import * as fromRoot from "../../store/reducers/index";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { DevActionTypes } from "src/app/developers/state/dev.action";

const userSchema = new schema.Entity("users");

@Injectable()
export class DevEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) //  private store: Store<fromRoot.AppState>
  {}

  // @Effect()
  // UpdateProfile$: Observable<any> = this.actions$.pipe(
  //   ofType(DevActions.DevActionTypes.UPDATE_PROFILE),
  //   map((action: DevActions.UpdateProfile) => action.payload),
  //   mergeMap((user: UserFetch) =>
  //     this.authService.updateProfile(user).pipe(
  //       map(
  //         (updateProfile: UserFetch) => {
  //           console.log("updateprofile", updateProfile);
  //           let userprofile = updateProfile;
  //           //new DevActions.UpdateProfileSucess(userprofile);
  //         }
  //         // new DevActions.DevActionTypes.UPDATE_PROFILE_SUCCESS({
  //         //   id: updateProfile.id,
  //         //   changes: updateProfile,
  //         // })
  //       ),
  //       catchError((error) => of(new DevActions.UpdateProfileFail(error)))
  //     )
  //   )
  // );

  @Effect()
  updateProfile: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.UPDATE_PROFILE),
    map((action: DevActions.UpdateProfile) => action.payload),
    mergeMap((payload: UserFetch) => {
      console.log("payload create profile: ", payload);
      return this.authService.updateProfile(payload).pipe(
        map((user: UserFetch) => {
          console.log("get profile effect", user);

          // return new DevActions.DevActionTypes.UPDATE_PROFILE_SUCCESS({
          //   id: user.id,
          //   changes: user,
          // });

          return new DevActions.UpdateProfileSucess({
            id: user.id,
            changes: user,
          });

          // let datus = normalize(user.profileCreate, userSchema);
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", datus);

          // let user_profile = user.body
          // this.currentUserSubject.next(user);
          // return new AuthActions.LogInSuccess({
          //   token: user.token,
          //   username: payload.username,
          //    firstName: user.firstName
          // });
          //return new AuthActions.LogInSuccess(user);
          // return new DevActions.createDeveloperSuccess(user.profileCreate);
        }),
        catchError((err) => of(new DevActions.loadDevelopersFail(err)))
      );
    })
  );

  @Effect()
  getProfile: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.CREATE_DEVELOPER),
    map((action: DevActions.CreateDeveloperdeAction) => action.payload),
    mergeMap((payload) => {
      console.log("payload create profile: ", payload);
      return this.authService.createProfile(payload).pipe(
        take(1),
        map((user) => {
          console.log("get profile effect", user.profileCreate);

          // let datus = normalize(user.profileCreate, userSchema);
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // console.log("get profile Effect", datus);

          // let user_profile = user.body
          // this.currentUserSubject.next(user);
          // return new AuthActions.LogInSuccess({
          //   token: user.token,
          //   username: payload.username,
          //    firstName: user.firstName
          // });
          //return new AuthActions.LogInSuccess(user);
          return new DevActions.createDeveloperSuccess(user.profileCreate);
        }),
        catchError((err) => of(new DevActions.loadDevelopersFail(err)))
      );
    })
  );

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
        catchError((error) => of(new DevActions.UpdateProfileFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  getProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.CREATE_DEVELOPER_SUCCESS),
    tap((user) => {
      console.log("effects get profile success!");
      // localStorage.setItem("token", user.payload.token);
      //localStorage.setItem("currentUser", JSON.stringify(user));
      // this.currentUserSubject.next(user);
      //this.store.dispatch(new DevActions.LoadProfileBegin());
      this.router.navigateByUrl("/");
      console.log("get profile success: ", user);
      this.alertService.success("Profile Created", true);
      console.log("data", user);
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

  @Effect({ dispatch: false })
  loadDevelopersSuccess$: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.LOAD_DEVELOPERS_SUCCESS),
    tap((user) => {
      // this.store.dispatch(new userActions.LoadProfileBegin());
      console.log("user load developer SUCCESS", user);
      this.router.navigateByUrl("/");
    })
  ); // this.router.navigateByUrl("/");

  // loadMaterials$ = this._actions.ofType(materials.MaterialActionTypes.LOAD)
  //   .startWith(new LoadMaterialsAction())
  //   .switchMap(() => this._service.query()
  //   .map((materials) => { ... })

  @Effect()
  loadDeveloper$: Observable<any> = this.actions$.pipe(
    ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_BEGIN),
    mergeMap((action: DevActions.LoadProfileBegin) => {
      return this.authService.getUserDetail().pipe(
        // take(1),
        map((data) => {
          console.log("map effect", data["user"]);
          //  console.log("normalize", normalize(data["user"], userSchema));
          //  let datus = normalize(data["user"], userSchema);
          // console.log("datus", datus.entities.users);
          // localStorage.setItem("currentUser", JSON.stringify(data["user"]));
          // this.store.dispatch(
          //   new DevActions.LoadDeveloperSuccess(data["user"])
          // );
          return new DevActions.LoadDeveloperSuccess(data["user"]);
          //return new userActions.LoadProfileSuccess(data["user"]);
        }),
        catchError((error) => of(new DevActions.loadDevelopersFail(error)))
      );
    })
  );
}
