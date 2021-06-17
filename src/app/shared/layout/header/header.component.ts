import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../core/models/user";
import * as userActions from "../../../auth/state/auth.action";
import { Store } from "@ngrx/store";
import * as fromUser from "../../../auth/state/auth.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private store: Store<fromUser.State>
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  logout() {
    console.log("clicked");
    localStorage.removeItem("currentUser");
    this.store.dispatch(new userActions.LogOut());
    //  this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
