import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin.routing.module";
import { DashboardComponent, UsersComponent, PostsComponent } from "./pages";

@NgModule({
  declarations: [UsersComponent, PostsComponent, DashboardComponent],
  imports: [AdminRoutingModule],
  providers: []
})
export class AdminModule {}
