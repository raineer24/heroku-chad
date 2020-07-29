import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, merge } from "rxjs";
import {
  mergeMap,
  switchMap,
  map,
  catchError,
  tap,
  concatMap,
  flatMap,
  take,
} from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";
import { AlertService } from "../../core/services/alert.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
//import * as AuthActions from "./auth.action";
import { User } from "src/app/core/models/user";

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alertService: AlertService
  ) {}
}
