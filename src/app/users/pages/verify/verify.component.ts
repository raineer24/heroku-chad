import { OnInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../core/services/user.service";
import { AlertService } from "../../../core/services/alert.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

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
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // this.subscription = this.route.params.subscribe(params => {
    //   const token = params["token"];
    //   console.log(token);
    // });
    // console.log(this.route.snapshot.params["token"]);

    //const token = this.route.queryParams["token"];

    const url = window.location.href;

    const url1 =
      "http://localhost:4200/#/users/verify?token=OBKdC-MFfjkypf2m6pSiuUNRdWCuFRW8F3nlswHN8JBRLZcYiN-jvpZ8Rg2vb5R";
    console.log(url);

    this.route.queryParams.subscribe(params => {
      console.log(params);

      const token = params["token"];

      //console.log(params1.toString());

      const x = "sdsd";
      console.log(x);

      console.log(typeof params);

      const url = `api/v2/verify/:token`;

      // return this.http
      //   .post(`api/v2/users/verify/${params.token}`, {
      //     headers: new HttpHeaders({
      //       "Content-Type": "application/json"
      //     })
      //   })
      //   .subscribe(
      //     result => {
      //       console.log(result);
      //       console.log("clicked");
      //       //console.log(data);
      //       this.alertService.success("Verify Successful", true);
      //       this.router.navigate(["/auth/login"]);
      //     },
      //     error => {
      //       console.log(error);
      //       console.log("error");
      //     }
      //   );
      this.authService.verifyToken(token).subscribe(result => {
        this.alertService.success("Verify Successful", true);
        this.router.navigate(["/auth/login"]);
      });
    });
  }
}
