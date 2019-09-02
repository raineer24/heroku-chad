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
  PostCreateComponent
} from "./pages";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    DashboardComponent,
    PostsListComponent,
    PostCreateComponent
  ],
  imports: [
    AdminRoutingModule,
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
    CommonModule
  ],
  providers: [AuthGuardService]
})
export class AdminModule {}
