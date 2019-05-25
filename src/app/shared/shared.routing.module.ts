import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent, FooterComponent } from "./layout";

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
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  {
    path: "",
    redirectTo: "shared",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
