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
} from "@angular/material";

/* NgRx */
import { StoreModule } from "@ngrx/store";
//import { reducer } from "./state/post.reducer";
import { reducer } from "../auth/state/user.reducer";
import { AuthService } from "../core/services/user.service";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "../auth/state/user.effects";

@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    DashboardComponent,
    PostsListComponent,
    PostCreateComponent,
    PostsDetailComponent,
    PostsEditComponent,
  ],
  imports: [
    AdminRoutingModule,
    StoreModule.forFeature("users", reducer),
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
    MatMenuModule,
  ],
  providers: [AuthGuardService],
})
export class AdminModule {}
