import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../state/user.reducer";
import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from "@angular/forms";

export interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: "app-createprofile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit {
  profForm: FormGroup;

  datasources = [
    {
      title: "Production",
      description: "descr",
      menuPath: "menu-2-4",
      //units: [Unit.KM, Unit.M, Unit.CM, Unit.MM]
    },
    {
      title: "Consumption",
      description: "descr",
      menuPath: "menu-2-3",
      //units: [Unit.KG, Unit.G, Unit.MG]
    },
    {
      title: "Usage",
      description: "descr",
      menuPath: "menu-2-5",
      //units: [Unit.KM2, Unit.M2, Unit.CM2, Unit.MM2]
    },
  ];

  animals: Animal[] = [
    { name: "Dog", sound: "Woof!" },
    { name: "Cat", sound: "Meow!" },
    { name: "Cow", sound: "Moo!" },
    { name: "Fox", sound: "Wa-pa-pa-pa-pa-pa-pow!" },
  ];

  constructor(
    private authenticationService: AuthService,
    private store: Store<fromUser.State>,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
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

  ngOnInit() {
    this.profForm = this.formBuilder.group({
      animalControl: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
}
