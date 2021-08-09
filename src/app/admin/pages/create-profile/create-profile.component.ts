import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select, ActionsSubject } from "@ngrx/store";
//import * as fromUser from "../../state/user.reducer";
//import * as fromApp from "../../../store/reducers";
import * as DevActions from "../../state/user.actions";
import { Subscription, Observable, of, Subject } from "rxjs";
import {
  skipWhile,
  skip,
  take, // this.store.select(fromUser.getCurrentUser).subscribe((data) => {
  //   console.log("getcurrentUser data", data);

  //   if (!this.isAddMode) {
  //     console.log("data email", data.user_profile[0]);

  //     let userProfile = data.user_profile[0];
  //     let skills = data["user_skill"][0].skills[0];
  //     console.log("skills", skills);
  //     console.log("profFOrm", this.profForm);
  //     this.profForm.patchValue({
  //       company_name: userProfile.company_name,
  //       website: userProfile.website,
  //       job_location: userProfile.job_location,
  //       status: userProfile.status,
  //       bio: userProfile.bio,
  //       areas_of_expertise: skills,
  //       youtube_handle: userProfile.youtube_handle,
  //       twitter_handle: userProfile.twitter_handle,
  //       instagram_handle: userProfile.instagram_handle,
  //       facebook_handle: userProfile.facebook_handle,
  //       id: data.id,
  //     });
  //     //  this.profForm.patchValue(currentProfile);
  //     // this.authenticationService
  //     //   .getUser(this.id)
  //     //   .pipe(first())
  //     //   .subscribe((x) => {
  //     //     console.log("get user id ", x);
  //     //     console.log("x", x.bio);
  //     //     this.profForm.patchValue(x);
  //     //   });
  //     // this.store
  //     //   .select(fromUser.getCurrentUser)
  //     //   .subscribe((currentProfile) => {
  //     //     console.log("currentuserprofile", currentProfile);
  //     //     // console.log("currentuserprofile", currentProfile["user_profile"][0]);
  //     //     let userProfile = currentProfile["user_profile"][0];
  //     //     console.log(
  //     //       "user skill set array :",
  //     //       currentProfile["user_skill"][0].skills[0]
  //     //     );
  //     //     //   // let skills = currentProfile["user_profile"][0];
  //     //     let skills = currentProfile["user_skill"][0].skills[0];
  //     //     console.log("this profForm", this.profForm);
  //     //     if (currentProfile) {
  //     //       // this.profForm.patchValue({
  //     //       //   company_name: userProfile.company_name,
  //     //       //   website: userProfile.website,
  //     //       //   job_location: userProfile.job_location,
  //     //       //   status: userProfile.status,
  //     //       //   bio: userProfile.bio,
  //     //       //   areas_of_expertise: skills,
  //     //       //   youtube_handle: userProfile.youtube_handle,
  //     //       //   twitter_handle: userProfile.twitter_handle,
  //     //       //   instagram_handle: userProfile.instagram_handle,
  //     //       //   facebook_handle: userProfile.facebook_handle,
  //     //       //   id: currentProfile.id,
  //     //       // });
  //     //       // this.profForm.patchValue(currentProfile);
  //     //     }
  //     //   });
  //   }
  // });
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { Status } from "../../../core/models/positions";
import { AlertService } from "../../../core/services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ofType } from "@ngrx/effects";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
} from "@angular/forms";
//import { forEach } from "@angular/router/src/utils/collection";
import { UserFetch } from "src/app/core/models";

export interface Position {
  label: string;
  value: string;
}
@Component({
  selector: "app-createprofile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() disableForm: boolean;
  profForm: FormGroup;
  filteredStatus: Status[];
  allStatus: Status[];
  selectedStatus: String = "";
  //selected: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  show = false;
  persons: FormArray;
  createSubs: Subscription;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  dropdownSelected: string;
  profile$: Observable<UserFetch>;
  destroyed$ = new Subject<boolean>();
  userData: any;

  constructor(
    private actionsSubj: ActionsSubject,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    // private store: Store<fromApp.AppState>,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    const route$ = this.route.params.subscribe((params) => {
      console.log("params", params);
      //  if (params.id.length > 0) {
      //    this.store.dispatch(
      //      profileActions.loadProfileData({ userId: params.id })
      //    );
      //  }
    });
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
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit() {
    this.actionsSubj
      .pipe(
        ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_SUCCESS),
        takeUntil(this.destroyed$)
      )
      .subscribe((data: any) => {
        console.log("xdatas", data);
        console.log("xdata", data["payload"]);
        /* hooray, success, show notification alert etc.. */
      });
    this.profForm = this.formBuilder.group({
      status: [null, Validators.required],
      website: ["", Validators.required],
      bio: ["", Validators.required],
      //githubusername: ["", Validators.required],
      job_location: ["", Validators.required],
      company_name: [""],
      areas_of_expertise: ["", Validators.required],
      instagram_handle: [""],
      facebook_handle: [""],
      youtube_handle: [""],
      twitter_handle: [""],
      id: (this.id = this.route.snapshot.params["id"]),
    });
    //   this.store.dispatch(new DevActions.LoadProfileBegin());
    //this.userData = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.allStatus);
    this.id = this.route.snapshot.params["id"];
    console.log("id", this.id);
    this.isAddMode = !this.id;

    //console.log("edit");

    //  const customer$: Observable<Customer> = this.store.select(
    //    fromCustomer.getCurrentCustomer
    //  );

    // this.store.select(fromUser.getCurrentUser).subscribe((data) => {
    //   console.log("getcurrentUser data", data);

    //   if (!this.isAddMode) {
    //     console.log("data email", data.user_profile[0]);

    //     let userProfile = data.user_profile[0];
    //     let skills = data["user_skill"][0].skills[0];
    //     console.log("skills", skills);
    //     console.log("profFOrm", this.profForm);
    //     this.profForm.patchValue({
    //       company_name: userProfile.company_name,
    //       website: userProfile.website,
    //       job_location: userProfile.job_location,
    //       status: userProfile.status,
    //       bio: userProfile.bio,
    //       areas_of_expertise: skills,
    //       youtube_handle: userProfile.youtube_handle,
    //       twitter_handle: userProfile.twitter_handle,
    //       instagram_handle: userProfile.instagram_handle,
    //       facebook_handle: userProfile.facebook_handle,
    //       id: data.id,
    //     });
    //     //  this.profForm.patchValue(currentProfile);
    //     // this.authenticationService
    //     //   .getUser(this.id)
    //     //   .pipe(first())
    //     //   .subscribe((x) => {
    //     //     console.log("get user id ", x);
    //     //     console.log("x", x.bio);
    //     //     this.profForm.patchValue(x);
    //     //   });
    //     // this.store
    //     //   .select(fromUser.getCurrentUser)
    //     //   .subscribe((currentProfile) => {
    //     //     console.log("currentuserprofile", currentProfile);
    //     //     // console.log("currentuserprofile", currentProfile["user_profile"][0]);
    //     //     let userProfile = currentProfile["user_profile"][0];
    //     //     console.log(
    //     //       "user skill set array :",
    //     //       currentProfile["user_skill"][0].skills[0]
    //     //     );
    //     //     //   // let skills = currentProfile["user_profile"][0];
    //     //     let skills = currentProfile["user_skill"][0].skills[0];
    //     //     console.log("this profForm", this.profForm);
    //     //     if (currentProfile) {
    //     //       // this.profForm.patchValue({
    //     //       //   company_name: userProfile.company_name,
    //     //       //   website: userProfile.website,
    //     //       //   job_location: userProfile.job_location,
    //     //       //   status: userProfile.status,
    //     //       //   bio: userProfile.bio,
    //     //       //   areas_of_expertise: skills,
    //     //       //   youtube_handle: userProfile.youtube_handle,
    //     //       //   twitter_handle: userProfile.twitter_handle,
    //     //       //   instagram_handle: userProfile.instagram_handle,
    //     //       //   facebook_handle: userProfile.facebook_handle,
    //     //       //   id: currentProfile.id,
    //     //       // });
    //     //       // this.profForm.patchValue(currentProfile);
    //     //     }
    //     //   });
    //   }
    // });
  }

  get status() {
    return this.profForm.get("status");
  }

  get twitter() {
    return this.profForm.get("twitter_handle");
  }

  get yt() {
    return this.profForm.get("youtube_handle");
  }

  get ig() {
    return this.profForm.get("instagram_handle");
  }

  get fb() {
    return this.profForm.get("facebook_handle");
  }

  setJob(value) {
    this.selectedStatus = value;
    let val = this.profForm.get("status").setValue(value);
    console.log("positions.value", this.status.value);
    console.log("val", val);

    if (value === "Other") {
      this.profForm.get("status").reset();
    }
  }

  onFormSubmit() {
    this.submitted = true;

    this.authenticationService.saveStatus(this.profForm.value);
    // this.resetForm();
    console.log("clicked");

    // this.twitter = this.profForm.get("twitter_handle");
    //console.log("control", control.value);

    if (this.twitter.value === null) {
      // control.setValue(null);
      console.log("empty");

      this.profForm.controls["twitter_handle"].setValue("not set");
      // this.profForm.reset();
    }

    if (this.yt.value === null) {
      // control.setValue(null);
      console.log("empty");

      this.profForm.controls["youtube_handle"].setValue("not set");
      // this.profForm.reset();
    }

    if (this.ig.value === null) {
      // control.setValue(null);
      console.log("empty");

      this.profForm.controls["instagram_handle"].setValue("not set");
      // this.profForm.reset();
    }

    if (this.fb.value === null) {
      // control.setValue(null);
      console.log("empty");

      this.profForm.controls["facebook_handle"].setValue("not set");
      // this.profForm.reset();
    }

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
    // this.actionsSubj
    //   .pipe(
    //     ofType(DevActions.DevActionTypes.LOAD_DEVELOPER_SUCCESS),
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((data) => {
    //     console.log("datas", data);
    //     console.log("data", data["payload"]);

    //     //  this.store.dispatch(
    //     //    articleAdded({ customerId, articleSku: skuElement.value })
    //     //  );
    //   });
    //const values = this.profForm.value;
    console.log("values form", this.profForm.value);
    // this.createSubs = this.authenticationService
    //   .createProfile(values)
    //   .subscribe(
    //     (data) => {
    //       this.alertService.success("Profile Created", true);
    //       console.log("data", data);
    //     },
    //     (error) => {
    //       this.alertService.error("error: ", error);
    //     }
    //   );
    //  this.store.dispatch(new DevActions.createDeveloper(this.profForm.value));
    // this.store.dispatch(new DevActions.createDeveloper(this.profForm.value));
  }

  private updateUser() {
    // this.authenticationService
    //   .update(this.id, this.profForm.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       this.alertService.success("Profile Updated", true);
    //     },
    //     error: (error) => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     },
    //   });

    // const updatedCustomer: Customer = {
    //   name: this.customerForm.get("name").value,
    //   phone: this.customerForm.get("phone").value,
    //   address: this.customerForm.get("address").value,
    //   membership: this.customerForm.get("membership").value,
    //   id: this.customerForm.get("id").value,
    // };

    const updatedProfile: UserFetch = {
      company_name: this.profForm.get("company_name").value,
      website: this.profForm.get("website").value,
      job_location: this.profForm.get("job_location").value,
      status: this.profForm.get("status").value,
      bio: this.profForm.get("bio").value,
      areas_of_expertise: this.profForm.get("areas_of_expertise").value,
      id: this.profForm.get("id").value,
      // youtube_handle: this.profForm.get("youtube_handle").value,
      //instagram_handle: this.profForm.get("instagram_handle").value,
      // facebook_handle: this.profForm.get("facebook_handle").value,
      //twitter_handle: this.profForm.get("twitter_handle").value,
      twitter_handle: this.twitter.value,
      youtube_handle: this.yt.value,
      instagram_handle: this.ig.value,
      facebook_handle: this.fb.value,
    };
    console.log("updatedprofile,", updatedProfile);

    //  this.store.dispatch(new DevActions.UpdateProfile(updatedProfile));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profForm.controls;
  }

  getFormGroupByN(n: number) {
    let result = [];

    result;
  }

  // onStatusChange(value) {
  //   this.selectedStatus = value;
  //   console.log("selectedStatus", this.selectedStatus);

  //   console.log("Status changed...");
  //   console.log("status.value", this.status.value);
  // }
}
