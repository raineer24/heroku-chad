import { Component } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular-chad";
  mobileQuery: MediaQueryList;
}
