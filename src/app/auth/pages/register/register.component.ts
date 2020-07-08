import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../../../core/services/alert.service";
import * as userActions from "../../state/user.action";
import { Store } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  registerSubs: Subscription;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  fd = new FormData();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private store: Store<fromUser.State>
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  get officialEmail() {
    return this.signUpForm.get("email");
  }

  initForm() {
    this.signUpForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      username: ["", Validators.required],
      first_name: ["", Validators.required],
      image: [null, Validators.required],
      password2: [null, Validators.required],
    });
  }

  onSubmit(e) {
    const values = this.signUpForm.value;
    if (e.target !== undefined) {
      this.fd.append("image", e.target.files[0]);
      return (this.signUpForm.value.image = this.fd);
    }

    this.fd.append("email", this.signUpForm.value.email);
    this.fd.append("password", this.signUpForm.value.password);
    this.fd.append("username", this.signUpForm.value.username);
    this.fd.append("first_name", this.signUpForm.value.first_name);
    this.fd.append("password2", this.signUpForm.value.password2);

    console.log("email", this.signUpForm.value.email);

    if (this.signUpForm.valid) {
      const data = {
        email: values.email,
        password: values.password,
      };
      this.store.dispatch(new userActions.SignUp(this.fd));
      // this.registerSubs = this.authService.registerUsers(this.fd).subscribe(
      //   (data) => {
      //     this.fd = new FormData();
      //     console.log(this.fd);
      //     this.alertService.success("Registration successful", true);
      //     this.router.navigate(["/auth/login"]);
      //   },
      //   (error) => {
      //     this.alertService.error(error);
      //     // this.loading = false;
      //   }
      // );
    }
  }
}
