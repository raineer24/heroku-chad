import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../services/user.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);

        if (err.error instanceof ErrorEvent) {
          console.log("error occured", err.error.message);
        } else {
          console.error(
            `Backend returned code ${err.status},` +
              `body was: ${JSON.stringify(err.error)}`
          );
          console.log("errors: ", err.error);

          const validationError = err.error.errors;

          if (err.status === 422) {
            console.log("validation", validationError);
            if (Array.isArray(validationError)) {
              console.log("array!");
            }
            validationError.forEach((element) => {
              let x = element;
              console.log("x", x);

              return throwError(x);
            });
          }

          // const extractedErrors = [];
          // errors.array().map((err) =>
          //   extractedErrors.push({
          //     [err.param]: err.msg,
          //   })array
          // );error = element;

          // Object.keys(validationErrors).forEach(prop => {
          //   const formControl = this.form.get(prop);
          //   if (formControl) {
          //     formControl.setErrors({
          //       serverError: validationErrors[prop]
          //     });
          //   }
        }

        if (err.status === 401) {
          // auto logout if 401 response returned from api

          this.authenticationService.logout();
          HttpErrorResponse;
          location.reload(true);
        }

        const error = err.error.message || err.statusText;
        if (err.status === 422) {
          console.log("error: ", err.error.errors[0]);
        }

        return throwError(error);
      })
    );
  }
}
