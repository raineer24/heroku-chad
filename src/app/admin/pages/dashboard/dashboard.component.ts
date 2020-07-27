import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../../auth/state/user.reducer";
import * as userActions from "../../../auth/state/user.action";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take } from "rxjs/operators";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  title = "";
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  profile$: Observable<User>;
  userData: {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    gender: string;
    mobileNumber: string;
    birthdate: string;
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
  }

  ngOnInit() {
    const user_id = JSON.parse(localStorage.getItem("currentUser")).user.id;
    console.log("user_id", user_id);

    this.authenticationService.getUserDetail(user_id).subscribe((data) => {
      console.log("data", data);
    });

    this.store.select(fromUser.getUserProfile).subscribe((data) => {
      console.log("data", data);
      this.currentUser = data;
    });
    //console.log("profile", this.store.select(fromUser.getUserProfile));
  }
}
