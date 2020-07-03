import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms/src/model";
import { isArray } from "util";

@Injectable({ providedIn: "root" })
export class ErrorService {
  constructor() {}

  submitted: boolean = false;

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
        this.setFieldError(form, fieldName, message);
      });
    }
  }

  hasWrongValue(form: FormGroup, fieldName: string) {
    //console.log("getfielderrors", this.getFieldErrors(form, fieldName));

    return this.getFieldErrors(form, fieldName).length > 0;
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    console.log("fielderro[0]", this.getFieldErrors(form, fieldName)[0]);

    return this.getFieldErrors(form, fieldName)[0];
  }

  getFieldErrors(form: FormGroup, fieldName: string): string[] {
    const control = this.findFieldControl(form, fieldName);
    console.log("[getFieldErrors]control", control);
    let data = Object.keys(control.errors);
    if (control && control.touched && control.errors) {
      console.log("get errors, control", control);
      return this.getErrors(control);
    } else {
      return [];
    }
  }

  getErrors(control: AbstractControl): string[] {
    console.log("get Errors click");
    console.log("controlla", control);
    const data = Object.keys(control.errors);
    console.log("data", data);

    return Object.keys(control.errors)
      .filter((error: any) => control.errors[error])
      .map((error: any) => {
        console.log("filter error", typeof error);

        const params = control.errors[error];
        console.log("params", params);
        return error;
      });
    // return Object.keys(control.errors)
    //   .filter((error: any) => control.errors[error])
    //   .map((error: any) => {
    //     console.log("filter error", error);

    //     const params = control.errors[error];
    //     return error;
    //   });
  }

  private setFieldError(form: FormGroup, fieldName: string, message: string) {
    const control = this.findFieldControl(form, fieldName);
    console.log("setfielderror", control);

    const errors = { [message]: true };
    console.log("msg.errors", errors);
    control.setErrors(errors);
  }

  private findFieldControl(
    form: FormGroup,
    fieldName: string
  ): AbstractControl {
    return form.get(fieldName);
  }
}
