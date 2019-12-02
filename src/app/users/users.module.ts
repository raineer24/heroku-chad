import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users.routing.module";
import { SharedModule } from "../shared";
import { UsersComponent } from "./users.component";
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
import { UserComponent, VerifyComponent } from "./pages";
@NgModule({
  declarations: [UsersComponent, UserComponent, VerifyComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [UsersComponent],
  providers: []
})
export class UsersModule {}
