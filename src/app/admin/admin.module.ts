import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin.routing.module";
import { UsersModule } from "../users/users.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "../core/guards/auth-guard.service";
import {
  DashboardComponent,
  UsersComponent,
  PostsComponent,
  PostsListComponent,
  PostCreateComponent,
  PostsDetailComponent,
  PostsEditComponent,
  CreateProfileComponent,
  LayoutComponent,
  AppDropdownComponent,
  AddExperienceComponent,
  AddEducationComponent,
} from "./pages";
import { SharedModule } from "../shared";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatTableModule,
} from "@angular/material";

/* NgRx */
import { StoreModule } from "@ngrx/store";
//import { reducer } from "./state/post.reducer";
import { userReducer } from "../admin/state/user.reducer";
import { AuthService } from "../core/services/user.service";
import { EffectsModule } from "@ngrx/effects";
import { DevEffects } from "../admin/state/user.effects";

@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    DashboardComponent,
    PostsListComponent,
    PostCreateComponent,
    PostsDetailComponent,
    PostsEditComponent,
    CreateProfileComponent,
    LayoutComponent,
    AppDropdownComponent,
    AddExperienceComponent,
    AddEducationComponent,
  ],
  imports: [
    AdminRoutingModule,
    StoreModule.forFeature("users", userReducer),
    EffectsModule.forFeature([DevEffects]),
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UsersModule,
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  exports: [AppDropdownComponent],
  providers: [AuthGuardService],
})
export class AdminModule {}
