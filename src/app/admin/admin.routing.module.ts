import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {
  UsersComponent,
  DashboardComponent,
  PostsComponent,
  PostsListComponent
} from "./pages";

const routes: Routes = [
  // path: "admin",
  // component: DashboardComponent,
  // children: [
  //   { path: "users", component: UsersComponent },
  //   { path: "posts", component: PostsComponent }
  // ]
  { path: "dashboard", component: DashboardComponent },
  { path: "users", component: UsersComponent },
  { path: "posts", component: PostsComponent },
  { path: "posts-list", component: PostsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
