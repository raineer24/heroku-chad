import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
} from "@angular/forms";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { Router, ActivatedRoute } from "@angular/router";
import { default as _rollupMoment } from "moment";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-add-edu",
  templateUrl: "./add-edu.component.html",
  styleUrls: ["./add-edu.component.scss"],
  providers: [
    DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddEducationComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private store: Store<fromUser.State>
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      school_name: [null, Validators.required],
      degree_name: [null, Validators.required],
      major_fieldofstudy: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      description: [null, Validators.required],
      current: [false, []],
    });
  }

  onSubmit() {
    const data = this.formGroup.value;
    // this.authenticationService.createEdu(data).subscribe(
    //   (data) => {
    //     console.log("data subscribe", data);
    //     // this.router.navigate([this.returnUrl]);
    //   }
    //   //(error) => this.onSubmitError(error)
    // );

    //this.store.dispatch(new userActions.createEduProfile(data));
    console.log("clicked");
  }

  toggleCtrState() {
    const ctrl = this.formGroup.get("end_date");
    if (ctrl.disabled) {
      ctrl.enable();
    } else {
      ctrl.disable();
    }
  }
}
