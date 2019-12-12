import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedRoutingModule } from "./shared.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {
  HeaderComponent,
  FooterComponent,
  AlertComponent,
  LoadingComponent
} from "./layout";
import { UsersModule } from "../users/users.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthModule } from "../auth/auth.module";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingComponent
  ]
})
export class SharedModule {}
