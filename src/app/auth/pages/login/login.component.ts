import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { first } from "rxjs/operators";
import { Subscription } from "rxjs";
import { User } from "../../../core/models/user";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  loginSubs: Subscription;
  currentUser: User;

  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    const user1 = this.authenticationService.currentUserValue;
    //  console.log(user1);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    let currentUrl = this.router.url;
    //console.log(currentUrl);

    let user2 = JSON.parse(localStorage.getItem("currentUser"));
    //console.log(user2);
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

    const data = {
      email: values.email,
      password: values.password
    };

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginSubs = this.authenticationService
      .login(data)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log("wrong error");
        }
      );
  }
}
