import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../core/guards/auth-guard.service";

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
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  { path: "users", component: UsersComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuardService] },
  {
    path: "posts-list",
    component: PostsListComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
