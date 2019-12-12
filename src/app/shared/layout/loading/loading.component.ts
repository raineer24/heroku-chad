import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  public loading$;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {}
}
