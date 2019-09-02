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
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { RegisterComponent } from "./pages";
import { LoginComponent } from "./pages";
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
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
    ReactiveFormsModule
  ],
  exports: [RegisterComponent, LoginComponent],
  providers: [AuthGuardService, AuthService]
})
export class AuthModule {}
