import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import { UsersComponent } from "./users.component";
import { RegisterComponent } from "./pages";

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
  //{ path: "users", component: UsersComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
