import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  registerSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
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

      this.registerSubs = this.authService
        .registerUsers(data)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(["/auth/login"]);
        });
    }
  }
}
