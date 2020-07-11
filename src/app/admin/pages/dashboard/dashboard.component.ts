import { Component } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromUser from "../../../auth/state/user.reducer";
import * as userActions from "../../../auth/state/user.action";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  title = "";
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromUser.State>
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        const data = user;
        this.currentUser = data["user"];
      }
    );
    this.store.dispatch(new userActions.LoadProfileBegin());
  }
}
