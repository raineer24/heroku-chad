import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./pages";

import { SharedModule } from "../shared";
import { UsersModule } from "../users/users.module";
@NgModule({
  imports: [HomeRoutingModule, SharedModule, UsersModule],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule {}
