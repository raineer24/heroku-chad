import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth.routing.module";
import { SharedModule } from "../shared";
//import { UsersComponent } from "./regist";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../core/services/user.service";
import { AuthGuardService } from "../core/guards/auth-guard.service";
import { reducer } from "./state/auth.reducer";

import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";
import { RegisterComponent } from "./pages";
import { LoginComponent } from "./pages";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";

/* NgRx */
import { StoreModule } from "@ngrx/store";
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("auth", reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RegisterComponent, LoginComponent],
  providers: [],
})
export class AuthModule {}
