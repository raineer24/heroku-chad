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

  getFieldError(form: FormGroup, fieldName: string): string {
    return this.getFieldErrors(form, fieldName)[0];
  }

  getFieldErrors(form: FormGroup, fieldName: string): string[] {
    const control = this.findFieldControl(form, fieldName);
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
  }

  private findFieldControl(
    form: FormGroup,
    fieldName: string
  ): AbstractControl {
    return form.get(fieldName);
  }
}
