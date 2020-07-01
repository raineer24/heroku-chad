import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms/src/model";

@Injectable({ providedIn: "root" })
export class ErrorService {
  constructor() {}

  renderServerErrors(form: FormGroup, response: any) {
    console.log("error:", response);
  }
}
