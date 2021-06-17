import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./core/guards/auth-guard.service";
const routes: Routes = [
  {
    path: "developers",
    loadChildren: "./developers/developers.module#DevelopersModule",
  },
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule",
  },
  {
    path: "shared",
    loadChildren: "./shared/shared.module#SharedModule",
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomeModule",
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule",
    canLoad: [AuthGuardService],
  },
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
