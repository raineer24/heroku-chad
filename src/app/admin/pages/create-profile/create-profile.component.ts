import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
@Component({
  selector: "app-createprofile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit {
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
