import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
@Component({
  selector: "app-add-edu",
  templateUrl: "./add-edu.component.html",
  styleUrls: ["./add-edu.component.scss"],
})
export class AddEducationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
