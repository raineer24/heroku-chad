import { OnInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../core/services/user.service";
import { AlertService } from "../../../core/services/alert.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html"
})
export class VerifyComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  token: string;

  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // this.subscription = this.route.params.subscribe(params => {
    //   const token = params["token"];
    //   console.log(token);
    // });
    // console.log(this.route.snapshot.params["token"]);

    //const token = this.route.queryParams["token"];

    const url = window.location.href;
    console.log(url);

    this.route.queryParams.subscribe(params => {
      this.token = params["token"];
      console.log(typeof this.token);
      // const url = `${this.baseUrl}/api/v2/users/verify/:token`;
      const url = `api/v2/verify/:token`;

      return this.http
        .post("api/v2/verify/:token", this.token, {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Accept: "application/json"
          })
        })
        .subscribe(
          result => {
            console.log(result);
            console.log("clicked");
          },
          error => {
            console.log(error);
            console.log("error");
          }
        );

      // this.authService.verifyToken(this.token).subscribe(
      //   token => {
      //     console.log("clicked");

      //     console.log(token);

      //     // console.log(this.token);
      //     //this.alertService.success("Registration successful", true);
      //     //this.router.navigate(["/auth/login"]);
      //   },
      //   error => {
      //     this.alertService.error(error);
      //     // this.loading = false;
      //   }
      // );
    });
  }
}
