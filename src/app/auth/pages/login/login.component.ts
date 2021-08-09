import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { AppState, selectAuthState } from "../../../store/app.states";
import { first } from "rxjs/operators";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { User } from "../../../core/models/user";
import { AlertService } from "../../../core/services/alert.service";
import * as authActions from "../../state/auth.action";
import { HttpErrorResponse } from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";
import * as fromUser from "../../state/auth.reducer";
import { ErrorService } from "../../../core/services/error.service";
//import { ILoginUser } from "../../../interfaces/user.interface";

/* NgRx */
import { Store, select } from "@ngrx/store";

// export interface FormError {
//   error: string;
//   params: any;
// }

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string>;
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;

  loginSubs: Subscription;
  currentUser: User;

  //user: User = new User();

  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    // private store: Store<fromUser.AuthModuleState>,
    public errorService: ErrorService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    // this.errorMessage$ = this.store.pipe(select(fromUser.getError));
    console.log(this.errorMessage$);
    this.authenticationService.currentUserValue;
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnDestroy() {
    if (this.loginSubs) {
      this.loginSubs.unsubscribe();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // a field is correct only if it is filled and have no errors
  hasCorrectValue(form: FormGroup, fieldName: string) {
    const control = this.findFieldControl(form, fieldName);
    console.log("control", control);
    console.log("clicked");
  }

  private findFieldControl(
    form: FormGroup,
    fieldName: string
  ): AbstractControl {
    return form.get(fieldName);
  }

  // get data(): ILoginUser {
  //   const values = this.loginForm.value;
  //   return {
  //     email: values.email,
  //     password: values.password,
  //   };
  // }

  onSubmit() {
    // const values = this.loginForm.value;
    // const payload = {
    //   email: values.email,
    //   password: values.password,
    // };
    // this.store.dispatch(authActions.login({ data: this.data }));
    // this.authenticationService.login(payload.email, payload.password).subscribe(
    //   (data) => {
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   (error) => this.onSubmitError(error)
    // );
  }

  protected onSubmitError(error) {
    this.errorService.renderServerErrors(this.loginForm, error);
  }
}
