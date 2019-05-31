import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent, DashboardComponent, PostsComponent } from "./pages";

const routes: Routes = [
  {
    path: "admin",
    component: DashboardComponent,
    children: [
      { path: "users", component: UsersComponent },
      { path: "posts", component: PostsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
