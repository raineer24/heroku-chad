import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
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
import { Observable, of } from "rxjs";
import { AuthService } from "../../core/services/user.service";
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
