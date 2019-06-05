import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin.routing.module";
import {
  DashboardComponent,
  UsersComponent,
  PostsComponent,
  PostsListComponent
} from "./pages";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule
} from "@angular/material";

@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    DashboardComponent,
    PostsListComponent
  ],
  imports: [
    AdminRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: []
})
export class AdminModule {}
