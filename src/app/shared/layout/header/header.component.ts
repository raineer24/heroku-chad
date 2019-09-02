import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../core/models/user";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
