import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreRoutingModule } from "./core-routing.module";
import { ErrorInterceptor } from "./guards/error.interceptor";
@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {}
