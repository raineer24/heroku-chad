import { NgModule } from "@angular/core";
import { DevelopersRoutingModule } from "./developers.routing.module";

import { DevelopersListComponent } from "./pages";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { DevEffects } from "./state/dev.effects";
//import { reducer } from "../developers/state/dev.reducer";
import { StoreModule } from "@ngrx/store";
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
    // StoreModule.forFeature("dev", reducer),
    //  EffectsModule.forFeature([DevEffects]),
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
  declarations: [DevelopersListComponent],
})
export class DevelopersModule {}
