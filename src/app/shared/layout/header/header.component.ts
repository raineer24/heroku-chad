import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../core/models/user";

import { Store } from "@ngrx/store";

import { AppState } from "../../../store/app.states";
import { LogOut } from "../../../store/actions/auth.actions";
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
    private store: Store<AppState>
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
    this.store.dispatch(new LogOut());
  }
}
