import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreRoutingModule } from "./core-routing.module";
// import { ErrorInterceptor } from "./guards/error.interceptor";
// import { JwtInterceptor } from "./guards/jwt.interceptor";
import { AuthGuardService } from "../core/guards/auth-guard.service";
import { AuthService } from "../core/services/user.service";
@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //AuthGuardService,
    // AuthService
  ]
})
export class CoreModule {}
