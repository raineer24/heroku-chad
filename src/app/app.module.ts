import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/shared.module";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
} from "@angular/material";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

/* NgRx */
import { StoreModule } from "@ngrx/store";

import { ErrorInterceptor } from "./core/guards/error.interceptor";
import { JwtInterceptor } from "./core/guards/jwt.interceptor";
import { AuthGuardService } from "./core/guards/auth-guard.service";
import { AuthService } from "./core/services/user.service";
import { LoadingInterceptor } from "./shared/layout/loading/loading.interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./admin/admin.module";
import { AlertComponent } from "./shared/layout/alert/alert.component";
import { LoadingService } from "./shared/layout/loading/loading.service";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    CoreModule,
    StoreModule.forRoot({}),
    AdminModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
