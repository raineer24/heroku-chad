import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from "@angular/forms";

export interface Position {
  label: string;
  value: string;
}
@Component({
  selector: "app-createprofile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit {
  profForm: FormGroup;

  show = false;

  professional: Position[] = [
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Other", value: "Other" },
  ];

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromUser.State>,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "thumbs-up",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/twitter-black-shape.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "inst",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/instagram.svg")
    );
    iconRegistry.addSvgIcon(
      "utube",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/youtube.svg")
    );
    iconRegistry.addSvgIcon(
      "fb",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/facebook.svg")
    );
  }

  ngOnInit() {
    this.profForm = this.formBuilder.group({
      animalControl: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
}
