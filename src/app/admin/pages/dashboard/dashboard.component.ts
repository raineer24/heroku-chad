import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "../../../auth/state/auth.reducer";
import * as userActions from "../../../auth/state/auth.action";
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
  users: User[] = [];
  profile$: Observable<User>;
  userData: {
    first_name: string;
  };

  statusArray: any;

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromAuth.State>
  ) {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
    //   (user) => {
    //     const data = user;
    //     this.currentUser = data["user"];
    //   }
    // );
    //this.store.dispatch(new userActions.LoadProfileBegin());
    this.store
      .select(fromAuth.getUserProfile)

      .subscribe((data) => {
        console.log("data: ", data);
        this.currentUser = data;
        // console.log("currentuser", this.currentUser);

        // this.statusArray = data.user_profile[0];
        // console.log("statusarray", this.statusArray.length);

        // console.log("data1", this.statusArray.bio);
      });
  }

  ngOnInit() {
    //console.log("profile", this.store.select(fromUser.getUserProfile));
  }
}
