import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./pages";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from "@angular/material";
@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule {}
