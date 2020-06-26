import { Injectable } from "@angular/core";

import { Observable, of, merge } from "rxjs";
import { mergeMap, switchMap, map } from "rxjs/operators";

import { AuthService } from "../../core/services/user.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../state/user.action";

@Injectable()
export class UserEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  @Effect()
  LogIn: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LOGIN),
    map((action: userActions.LogIn) => console.log(action.payload))
  );
}
