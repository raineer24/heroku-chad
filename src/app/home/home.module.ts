import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./pages";

import { SharedModule } from "../shared";

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule {}
