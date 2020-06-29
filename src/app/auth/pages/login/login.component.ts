import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { first } from "rxjs/operators";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { User } from "../../../core/models/user";
import { AlertService } from "../../../core/services/alert.service";
import * as userActions from "../../state/user.action";

import * as fromUser from "../../state/user.reducer";

/* NgRx */
import { Store, select } from "@ngrx/store";

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
  data: any;
  loginSubs: Subscription;
  currentUser: User;

  user: User = new User();

  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private store: Store<fromUser.State>
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required],
    });
    this.errorMessage$ = this.store.pipe(select(fromUser.getError));
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

  onSubmit() {
    this.submitted = true;
    const values = this.loginForm.value;
    console.log(this.authenticationService.currentUserValue);
    const payload = {
      email: values.email,
      password: values.password,
    };
    console.log(payload);

    this.store.dispatch(new userActions.LogIn(payload));
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = false;
    this.loginSubs = this.authenticationService
      .login(payload.email, payload.password)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log("data", data);

          this.router.navigate([this.returnUrl]);
          console.log(this.returnUrl);
        },
        (error) => {
          //this.error = error;
          console.log("err: ", error);

          // this.alertService.error(error);
          // console.log(this.alertService.error(error));

          // this.loading = false;
        }
      );
  }
}
