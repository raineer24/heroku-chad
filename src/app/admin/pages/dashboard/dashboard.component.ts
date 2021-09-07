import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { UserFetch, Experience, User } from "../../../core/models/";
import { AuthService } from "../../../core/services/user.service";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { ofType } from "@ngrx/effects";
//import { selectUserState } from "../../../store/app.states";
//import * as fromRoot from "../../../store/reducers";
//import * as fromUser from "../../state/user.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import * as DevActions from "../../state/user.actions";
import { Subscription, Observable, of, Subject, from } from "rxjs";
import { skipWhile, skip, take, filter, takeUntil } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
//import { getCurrentUser, getAllUsers } from "../../state/user.reducer";
//import { State, getUserInfoState } from "../../../store/reducers/user";
import { State, selectUserData } from "../../../reducers/";
import {
  UserActions,
  GetUserAction,
  UserActionTypes,
} from "../../../store/actions/user.actions";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // public user$: Observable<User> = this.store.pipe(
  //   select((str) => str.userInfo)
  // );

  data: Observable<User>;
  user$: Observable<User>;
  userInfo$: Observable<any>;
  userId: string;
  // users$: User[];
  destroyed$ = new Subject<boolean>();
  title = "";
  currentUser: any;
  currentUserSubscription: Subscription;
  //users: User[] = [];
  // profile$: Observable<UserFetch>;
  profile$: Observable<UserFetch>;
  // userData: {
  //   first_name: string;
  // };
  isAddMode: boolean;
  public dataSource: MatTableDataSource<UserFetch>;
  displayedColumns = ["email", "username"];
  //public noData: Observable<UserFetch>;
  //public noData: UserFetch;
  public noData: UserFetch[] = [<UserFetch>{}];
  userData: {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    gender: string;
    mobileNumber: string;
    birthdate: string;
  };

  statusArray: any;
  destroy$ = new Subject<boolean>();
  constructor(
    private authenticationService: AuthService,
    private store: Store<State>,
    private router: Router,
    private actionsSubj: ActionsSubject,
    private route: ActivatedRoute
  ) {
    console.log("store staste", this.store.select(selectUserData));
    this.userData = JSON.parse(localStorage.getItem("currentUser"));
    console.log("userData", this.userData["user"].id);

    this.store.dispatch(new GetUserAction({ id: this.userData["user"].id }));
    this.userInfo$ = this.store
      .select(selectUserData)
      .pipe(takeUntil(this.destroyed$));
    console.log("userinfo", this.userInfo$);
    // this.store.subscribe((store) => {
    //   console.log("store : ", store.isLoading);
    // });
    // this.currentUserSubscription = this.userInfo$.subscribe((currentUser) => {
    //   // console.log("currentUser : ", currentUser["userInfo"]);
    //   console.log("current user: ", currentUser);
    //   //   this.user$ = currentUser["userInfo"];
    // });
    this.userInfo$.subscribe((currentUser) => {
      //   // console.log("currentUser : ", currentUser["userInfo"]);
      console.log("current user: ", currentUser);
      //   this.user$ = currentUser["userInfo"];
    });
    // this.userInfo$ = this.store.select((str) => str.userInfo);
    //  this.userInfo$ = this.store.select((str) => str.userInfo);

    //  this.user$ = this.store.select(selectUserState);
    // this.data = this.store.select(fromRoot.selectUserListState$);
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
    //   (user) => {
    //     const data = user;
    //     this.currentUser = data["user"];
    //   }
    // );
    //this.currentUser$ = this.store.pipe(select(getUserData));
    //this.profile$ = this.store.pipe(select(fromRoot.SU));
    // console.log("profile", this.profile$);
    // this.profile$.subscribe((data) => {
    //   console.log("data", data);
    // });

    const route$ = this.route.params.subscribe((params) => {
      console.log("params", params);
      this.userId = params["userId"];
      // if (params.id.length > 0) {
      //   //this.store.dispatch(new DevActions.LoadProfileBegin(params.id));
      // }
    });

    // this.actionsSubj
    //   .pipe(
    //     ofType(UserActionTypes.GET_USER_SUCCESS),
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((data) => {
    //     console.log("datas", typeof data);
    //     console.log("data", data["payload"]);
    //   });
  }

  ngOnInit() {
    // console.log("sub", this.currentUserSubscription);
  }

  deleteEdu(id: number) {
    //alert("In Delete");
    // this.authenticationService.deleteExp(id).subscribe((data) => {
    //   console.log("delete data", data);
    // });
    // this.store.dispatch(new userActions.deleteEduProfile(id));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    //this.currentUserSubscription.unsubscribe();
  }
  private initializeData(users: any): void {
    console.log("this initial", this.noData);
    //  let x = Object.entries(this.noData);
    //  console.log("x", x);
    this.dataSource = new MatTableDataSource(this.noData);
    console.log("this data source", this.dataSource.data);
  }
}
// private initializeData(users: any): void {
//   console.log("this initial", this.noData);
//   //  let x = Object.entries(this.noData);
//   //  console.log("x", x);
//   this.dataSource = new MatTableDataSource(this.noData);
//   console.log("this data source", this.dataSource.data);
// }
