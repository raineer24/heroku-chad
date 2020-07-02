import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms/src/model";
import { isArray } from "util";

@Injectable({ providedIn: "root" })
export class ErrorService {
  constructor() {}

  renderServerErrors(form: FormGroup, response: any) {
    if (response.status === 422) {
      const data = response.error.errors.errors;
      console.log("data", data);

      const fields = Object.keys(data || {});
      console.log("fields", fields);

      data.forEach((elements: any) => {
        console.log("elements.email", elements.msg);
        const message = elements.msg;
        const fieldName = elements.param;
        //this.setFieldError(form, fieldName, message);

        // for (const key in elements) {
        //   console.log("key", key);
        //   console.log("email", key);

        //   if (elements.hasOwnProperty(key)) {
        //     const element = elements[key];
        //     console.log("element", element);
        //   }
        // }
      });
      // [{ x: 100 }, { x: 200 }, { x: 300 }];
      // [{ email: "Email is required" }, { password: "Password is required" }]
      //       [
      //     {
      //       "type": "field-validation-error",
      //       "field": "password",
      //       "message": "Incorrect password"
      //     }
      //   ]
    }
  }

  hasWrongValue(form: FormGroup, fieldName: string) {
    return this.getFieldErrors(form, fieldName).length > 0;
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    return this.getFieldErrors(form, fieldName)[0];
  }

  getFieldErrors(form: FormGroup, fieldName: string): string[] {
    const control = this.findFieldControl(form, fieldName);
    console.log("control", control);

    if (control && control.touched && control.errors) {
      return this.getErrors(control);
    } else {
      return [];
    }
  }

  getErrors(control: AbstractControl): string[] {
    return Object.keys(control.errors)
      .filter((error: any) => control.errors[error])
      .map((error: any) => {
        const params = control.errors[error];
        return error;
      });
  }

  private setFieldError(form: FormGroup, fieldName: string, message: string) {
    const control = this.findFieldControl(form, fieldName);
    const errors = { [message]: true };
    control.setErrors(errors);
  }

  private findFieldControl(
    form: FormGroup,
    fieldName: string
  ): AbstractControl {
    return form.get(fieldName);
  }
}
