import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth.routing.module";
import { SharedModule } from "../shared";
//import { UsersComponent } from "./regist";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule
} from "@angular/material";
import { RegisterComponent } from "./pages";
@NgModule({
  declarations: [RegisterComponent],
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
    SharedModule
  ],
  exports: [RegisterComponent],
  providers: []
})
export class AuthModule {}
