import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { first } from "rxjs/operators";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { User } from "../../../core/models/user";
import { AlertService } from "../../../core/services/alert.service";

import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.states";
import { LogIn } from "../../../store/actions/auth.actions";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
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
    private store: Store<AppState>
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
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
    this.submitted = false;
    const values = this.loginForm.value;
    console.log(this.authenticationService.currentUserValue);
    const payload = {
      email: this.user.email,
      password: this.user.password,
    };
    this.store.dispatch(new LogIn(payload));

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginSubs = this.authenticationService
      .login(this.user.email, this.user.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          console.log(this.returnUrl);
        },
        (error) => {
          //this.error = error;
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
