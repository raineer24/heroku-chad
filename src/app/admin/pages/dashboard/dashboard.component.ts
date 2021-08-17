import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserFetch, Experience, User } from "../../../core/models/";
import { AuthService } from "../../../core/services/user.service";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { ofType } from "@ngrx/effects";
//import * as fromRoot from "../../../store/reducers";
//import * as fromUser from "../../state/user.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import * as DevActions from "../../state/user.actions";
import { Subscription, Observable, of, Subject, from } from "rxjs";
import { skipWhile, skip, take, filter, takeUntil } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
//import { getCurrentUser, getAllUsers } from "../../state/user.reducer";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: Observable<any>;
  // users$: User[];
  destroyed$ = new Subject<boolean>();
  title = "";
  currentUser: any;
  currentUserSubscription: Subscription;
  //users: User[] = [];
  // profile$: Observable<UserFetch>;
  profile$: Observable<UserFetch>;
  userData: {
    first_name: string;
  };
  isAddMode: boolean;
  public dataSource: MatTableDataSource<UserFetch>;
  displayedColumns = ["email", "username"];
  //public noData: Observable<UserFetch>;
  //public noData: UserFetch;
  public noData: UserFetch[] = [<UserFetch>{}];

  statusArray: any;
  destroy$ = new Subject<boolean>();
  constructor(
    private authenticationService: AuthService,
    // private store: Store<fromRoot.AppState>,
    private router: Router,
    private actionsSubj: ActionsSubject,
    private route: ActivatedRoute
  ) {
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
      if (params.id.length > 0) {
        //this.store.dispatch(new DevActions.LoadProfileBegin(params.id));
      }
    });

    // this.store.dispatch(new DevActions.LoadProfileBegin());
    this.actionsSubj
      .pipe(
        ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_SUCCESS),
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        console.log("datas", data);
        console.log("data", data["payload"]);
        /* hooray, success, show notification alert etc.. */
        // console.log("DATA", data["payload"]);
        this.noData = data["payload"];
        //  console.log("thisnodata", this.noData["entities"]["users"]);
        // // this.initializeData(data["payload"]);
        // this.dataSource = new MatTableDataSource(this.noData);
        // console.log("this.datasource", this.dataSource);
      });

    // this.store
    //   .pipe(
    //     select(fromUser.getUserProfile),
    //     filter((user) => !!user)
    //   )
    //   .subscribe((data) => {
    //     console.log("data: ", data);
    //     this.currentUser = data;getCustomers
    //     // console.log("currentuser", this.currentUser);
    //     // this.statusArray = data.user_profile[0];
    //     // console.log("statusarray", this.statusArray.length);
    //     // console.log("data1", this.statusArray.bio);
    //   });
  }

  ngOnInit() {
    // this.data = this.store.pipe(select(fromUser.getCurrentUser));
    // this.data.subscribe((users) => {
    //   console.log("USERS:", users);
    // });
  }

  deleteRow(x) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      // this.row.splice(x, 1);
    }
  }
  deleteUser(id: number) {
    //alert("In Delete");
    // this.authenticationService.deleteExp(id).subscribe((data) => {
    //   console.log("delete data", data);
    // });
    //this.store.dispatch(new userActions.deleteExpProfile(id));
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
