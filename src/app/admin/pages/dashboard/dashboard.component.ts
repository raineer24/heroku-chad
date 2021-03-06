import { Component, OnInit } from "@angular/core";
import { UserFetch } from "../../../core/models/";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  title = "";
  currentUser: any;
  currentUserSubscription: Subscription;
  //users: User[] = [];
  profile$: Observable<UserFetch>;
  userData: {
    first_name: string;
  };
  isAddMode: boolean;

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
    //     this.currentUser = data;
    //     // console.log("currentuser", this.currentUser);
    //     // this.statusArray = data.user_profile[0];
    //     // console.log("statusarray", this.statusArray.length);
    //     // console.log("data1", this.statusArray.bio);
    //   });
  }

  ngOnInit() {
    //this.isNew = this.router.url === "/newuser";
    console.log("router", this.router.url);

    //console.log("profile", this.store.select(fromUser.getUserProfile));

    if (!this.isAddMode) {
      console.log("test");
    }
  }
}
