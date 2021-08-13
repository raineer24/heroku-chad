import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AuthService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../../../core/services/alert.service";
import * as AuthActions from "../../state/auth.action";
import { Store } from "@ngrx/store";
import { SignUp } from "../../../store/actions/auth.actions";
import { IUser } from "../../../interfaces";
import { AppState, selectAuthState } from "../../../store/app.states";

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
  profile: IUser;
  sendForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>
  ) {
    this.initForm();

    this.sendForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
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
  onImageChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      //this.signUpForm.get("image").setValue(file);
      reader.onload = () => {
        // this.signUpForm.patchValue({
        //   image: reader.result,
        // });
        this.signUpForm.get("image").setValue(reader.result);
      };
    }
  }

  onSubmit(e) {
    const values = this.signUpForm.value;

    if (this.signUpForm.valid) {
      //const payload = this.signUpForm.getRawValue();
      const formData: FormData = this.formattingData(
        this.signUpForm.getRawValue()
      );

      formData.forEach((value, key) => {
        console.log(key + " " + value);
      });
      this.store.dispatch(new SignUp(formData));
      console.log("formData", formData);
    }
  }

  formattingData(payload): FormData {
    const formData = new FormData();
    // Object.entries(payload).forEach(([key, value]) => formData.append(key, payload[key]));

    formData.append("email", payload.email);
    formData.append("username", payload.username);
    formData.append("firstName", payload.first_name);
    formData.append("password2", payload.password2);
    formData.append("password", payload.password);
    formData.append("image", payload.image);
    // if (payload.height && payload.weight) {
    //   formData.append(
    //     "detail",
    //     JSON.stringify({
    //       height: payload.height ? payload.height : "N/C",
    //       weight: payload.weight ? payload.weight : "N/C",
    //     })
    //   );
    // }

    // if (payload.profilePicture !== null) {
    //   formData.append('profilePicture', payload.profilePicture, payload.profilePicture.name);
    // }
    console.log(formData);
    return formData;
  }
}
