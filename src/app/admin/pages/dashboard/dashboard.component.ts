import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../../auth/state/user.reducer";
import * as userActions from "../../../auth/state/user.action";
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

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromUser.State>
  ) {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
    //   (user) => {
    //     const data = user;
    //     this.currentUser = data["user"];
    //   }
    // );
    this.store.dispatch(new userActions.LoadProfileBegin());
    this.store
      .pipe(
        select(fromUser.getUserProfile),
        filter((user) => !!user)
      )
      .subscribe((data) => {
        console.log("data: ", data.user_profile[0]);
        this.currentUser = data;

        // console.log("data1", this.currentUser);
      });
  }

  ngOnInit() {
    //console.log("profile", this.store.select(fromUser.getUserProfile));
  }
}
