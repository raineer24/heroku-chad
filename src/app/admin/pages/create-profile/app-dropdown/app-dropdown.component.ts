import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

export interface Positions {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-dropdown",
  templateUrl: "./app-dropdown.component.html",
  styleUrls: ["./app-dropdown.component.scss"],
})
export class AppDropdownComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
