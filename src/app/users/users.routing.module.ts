import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {
  UserComponent,
  RightsComponent,
  DashboardComponent,
  AdminComponent
} from "./pages";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "user", component: UserComponent },
      { path: "rights", component: RightsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
