import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms/src/model";
import { isArray } from "util";

@Injectable({ providedIn: "root" })
export class ErrorService {
  constructor() {}

  renderServerErrors(form: FormGroup, response: any) {
    if (response.status === 422) {
      const data = response.error.errors;
      const fields = Object.keys(data || {});
      data.forEach((elements: any) => {
        for (const key in elements) {
          console.log("key", key);

          if (elements.hasOwnProperty(key)) {
            const element = elements[key];
            console.log("element", element);
          }
        }
      });
      // [{ x: 100 }, { x: 200 }, { x: 300 }];
      // [{ email: "Email is required" }, { password: "Password is required" }]
    }
  }
}
