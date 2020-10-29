import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter, first } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { Status } from "../../../core/models/positions";
import { AlertService } from "../../../core/services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";

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
  profForm: FormGroup;
  filteredStatus: Status[];
  allStatus: Status[];
  selectedStatus: String = "";
  selected: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  show = false;
  persons: FormArray;
  createSubs: Subscription;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params["id"];
    console.log("id", this.id);
    this.isAddMode = !this.id;

    this.profForm = this.formBuilder.group({
      status: [null, Validators.required],
      website: ["", Validators.required],
      bio: ["", Validators.required],
      githubusername: ["", Validators.required],
      job_location: ["", Validators.required],
      company_name: ["", Validators.required],
      areas_of_expertise: ["", Validators.required],
      instagram_handle: [""],
      fb: [""],
      youtube_handle: [""],
      twitter_handle: [""],
    });

    if (!this.isAddMode) {
      this.authenticationService
        .getUser(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log("x", x);

          this.profForm.patchValue(x);
        });
    }
    console.log("edit");
  }

  get status() {
    return this.profForm.get("status");
  }

  onFormSubmit() {
    this.submitted = true;

    this.authenticationService.saveStatus(this.profForm.value);
    // this.resetForm();
    console.log("clicked");

    // stop here if form is invalid
    if (this.profForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    const values = this.profForm.value;
    this.createSubs = this.authenticationService
      .createProfile(values)
      .subscribe(
        (data) => {
          this.alertService.success("Profile Created", true);
          console.log("data", data);
        },
        (error) => {
          this.alertService.error("error: ", error);
        }
      );
  }

  private updateUser() {
    this.authenticationService
      .update(this.id, this.profForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success("User updated", {
          //   keepAfterRouteChange: true,
          // });
          this.alertService.success("Profile Created", true);
          //this.router.navigate(["../../"], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
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
