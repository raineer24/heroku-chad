import { Component } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  title = "";
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private authenticationService: AuthService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser);
      }
    );
  }
}
