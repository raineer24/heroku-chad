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
import { Status } from "../../../core/models/positions";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
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
  //profForm: FormGroup;
  filteredStatus: Status[];
  allStatus: Status[];
  selectedStatus: String = "";
  selected: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  show = false;
  persons: FormArray;
  createSubs: Subscription;

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
    this.allStatus = this.authenticationService.getAllPositions();
    console.log(this.allStatus);
  }
  profForm = this.formBuilder.group({
    status: [null, Validators.required],
    website: ["", Validators.required],
    bio: ["", Validators.required],
    githubusername: ["", Validators.required],
    location: ["", Validators.required],
    company: ["", Validators.required],
    areas_of_expertise: ["", Validators.required],
    inst: [""],
    fb: [""],
    utube: [""],
    twitter: [""],
  });

  get status() {
    return this.profForm.get("status");
  }

  onFormSubmit() {
    const values = this.profForm.value;
    this.authenticationService.saveStatus(this.profForm.value);
    // this.resetForm();
    console.log("clicked");

    if (this.profForm.valid) {
      this.createSubs = this.authenticationService
        .createProfile(values)
        .subscribe((data) => {
          console.log("data", data);
        });
    }

    // if (buttonType === "Next") {
    //   console.log(buttonType);
    // }
    // if (buttonType === "Previous") {
    //   console.log(buttonType);
    // }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profForm.controls;
  }

  getFormGroupByN(n: number) {
    let result = [];

    result;
  }

  onStatusChange(value) {
    this.selectedStatus = value;
    console.log(this.selectedStatus);

    console.log("Status changed...");
    console.log("status.value", this.status.value);
  }
}
