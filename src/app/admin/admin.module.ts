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
import { STORE_FEATURES } from "../consts";

/* NgRx */
import { StoreModule } from "@ngrx/store";
//import { reducer } from "./state/post.reducer";
import { reducer } from "../store/reducers/user/user.reducer";
import { AuthService } from "../core/services/user.service";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "../store/effects/user.effects";
import { reducers, metaReducers } from "../reducers/";
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
    // StoreModule.forFeature(STORE_FEATURES.posts, userReducer),
    // StoreModule.forFeature(STORE_FEATURES.user, reducer, {
    //   metaReducers: metaReducer,
    // }),
    StoreModule.forFeature("auth", reducers, { metaReducers }),
    EffectsModule.forFeature([UserEffects]),
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
