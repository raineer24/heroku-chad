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
