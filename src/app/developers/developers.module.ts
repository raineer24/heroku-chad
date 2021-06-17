import { NgModule } from "@angular/core";
import { DevelopersRoutingModule } from "./developers.routing.module";

import { DevelopersComponent } from "./pages";
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
  MatInputModule,
} from "@angular/material";
@NgModule({
  imports: [
    DevelopersRoutingModule,
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
    MatInputModule,
  ],
  providers: [],
  declarations: [DevelopersComponent],
})
export class DevelopersModule {}
