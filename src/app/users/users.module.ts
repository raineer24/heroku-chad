import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users.routing.module";
import { UsersComponent } from "./pages";

@NgModule({
  declarations: [UsersComponent],
  imports: [UsersRoutingModule],
  providers: []
})
export class UsersModule {}
