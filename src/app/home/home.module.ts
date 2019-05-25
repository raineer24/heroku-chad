import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./pages";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared";
import { CommonModule } from "@angular/common";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule
} from "@angular/material";
@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule,

    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule {}
