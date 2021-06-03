import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../core/guards/auth-guard.service";

import {
  UsersComponent,
  DashboardComponent,
  PostsComponent,
  PostsListComponent,
  PostsDetailComponent,
  PostsEditComponent,
  CreateProfileComponent,
  LayoutComponent,
  AddExperienceComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "add", component: CreateProfileComponent },
      { path: "add-exp", component: AddExperienceComponent },
      { path: "edit/:id", component: CreateProfileComponent },
    ],
  },
  // {
  //   path: "",
  //   redirectTo: "dashboard",
  //   pathMatch: "full",
  // },
];

//  RouterModule.forRoot([
//       { path: 'Employees', component: EmployeesComponent, pathMatch: 'full' },
//       { path: 'Add', component: EmployeeAddComponent, pathMatch: 'full' },
//       **{ path: 'Edit/:id', component: EmployeeEditComponent },
//       { path: 'Edit', component: EmployeeEditComponent },**
//       { path: '', redirectTo: 'Employees', pathMatch: 'full' }
//     ]),
//   ],

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
