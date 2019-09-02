import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/user.service";
@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canLoad(route: Route): boolean {
    let url: string = route.path;
    console.log("Url:" + url);
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      console.log("logged in1");

      //logged in so return true
      return true;
    }
    // if (this.authService.isUserLoggedIn()) {
    //   return true;
    // }
    // this.authService.setRedirectUrl(url);
    // this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    console.log("currentUSer", currentUser);

    if (currentUser) {
      console.log("logged in1");

      //logged in so return true
      return true;
    }

    //not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
