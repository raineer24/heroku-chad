import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserComponent, VerifyComponent } from "./pages";

//import { UsersComponent } from "./pages";

const routes: Routes = [
  // {
  //   path: "admin",
  //   component: AdminComponent,
  //   children: [
  //     { path: "dashboard", component: DashboardComponent },
  //     { path: "user", component: UserComponent },
  //     { path: "rights", component: RightsComponent }
  //   ]
  // }
  { path: "users", component: UsersComponent },
  { path: "verify", component: VerifyComponent },
  { path: "user", component: UserComponent },
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
