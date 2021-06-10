import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserFetch, Experience } from "../../../core/models/";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { getCurrentUser, getAllUsers } from "../../state/user.reducer";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = "";
  currentUser: any;
  currentUserSubscription: Subscription;
  //users: User[] = [];
  profile$: Observable<UserFetch>;
  userData: {
    first_name: string;
  };
  isAddMode: boolean;
  public dataSource: MatTableDataSource<UserFetch>;
  displayedColumns: string[] = ["email", "job_title", "years"];
  //public noData: Observable<UserFetch>;
  public noData: any;

  statusArray: any;

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromUser.State>,
    private router: Router
  ) {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
    //   (user) => {
    //     const data = user;
    //     this.currentUser = data["user"];
    //   }
    // );

    //this.currentUser$ = this.store.pipe(select(getUserData));

    this.profile$ = this.store.pipe(select(fromUser.getCurrentUser));
    console.log("profile", this.profile$);

    this.store.dispatch(new userActions.LoadProfileBegin());
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
    // this.store.dispatch(new userActions.LoadProfileBegin());
    // this.profile$.subscribe((data) => {
    //   console.log("data", data);
    //   this.noData = data;
    //   console.log("no data", this.noData.email);
    //   this.dataSource = new MatTableDataSource(this.noData);
    //   console.log("thisdatasource", this.dataSource);
    //   this.initializeData(this.noData);
    // });
    this.store.pipe(select(getCurrentUser)).subscribe((users) => {
      console.log("USERS:", users);
      this.noData = users;
      console.log("this no data", this.noData);
      // let data = users[0];
      this.initializeData(this.noData);
    });
    // this.store.pipe(select(fromUser.getCurrentUser)).subscribe((users) => {
    //   console.log("users:", users);
    //   // console.log("users:", users.user_experience);
    //   // let data = users.user_experience;
    //   this.initializeData(users);
    // });
    //this.isNew = this.router.url === "/newuser";
    console.log("router", this.router.url);

    //console.log("profile", this.store.select(fromUser.getUserProfile));

    if (!this.isAddMode) {
      console.log("test");
    }
  }

  ngOnDestroy() {
    console.log("Page B ngOnDestroy");
  }

  private initializeData(users: any): void {
    console.log("this initial", this.noData);
    //  let x = Object.entries(this.noData);
    //  console.log("x", x);
    this.dataSource = new MatTableDataSource(this.noData);
    console.log("this data source", this.dataSource.data);
  }
}
