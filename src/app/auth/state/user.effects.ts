import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../state/user.action";

@Injectable({ providedIn: "root" })
export class UserEffects {
  constructor(private action$: Action, private userService: AuthService) {}
}
