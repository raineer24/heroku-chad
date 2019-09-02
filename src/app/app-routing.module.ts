import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule"
  },
  {
    path: "shared",
    loadChildren: "./shared/shared.module#SharedModule"
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomeModule"
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule"
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
