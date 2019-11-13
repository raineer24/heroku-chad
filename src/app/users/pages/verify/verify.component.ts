import { OnInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html"
})
export class VerifyComponent implements OnInit {
  token;

  private subscription: Subscription;
  constructor(private route: ActivatedRoute) {}

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
      console.log(params);
    });
  }
}
