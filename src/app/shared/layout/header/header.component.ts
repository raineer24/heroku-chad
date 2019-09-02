import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
