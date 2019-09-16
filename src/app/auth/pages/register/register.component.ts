import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../../../core/services/alert.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  registerSubs: Subscription;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

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
          Validators.pattern(this.emailPattern)
        ])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  onSubmit() {
    const values = this.signUpForm.value;

    if (this.signUpForm.valid) {
      const data = {
        email: values.email,
        password: values.password
      };

      this.registerSubs = this.authService.registerUsers(data).subscribe(
        data => {
          console.log(data);
          this.alertService.success("Registration successful", true);
          this.router.navigate(["/auth/login"]);
        },
        error => {
          this.alertService.error(error);
          // this.loading = false;
        }
      );
    }
  }
}
