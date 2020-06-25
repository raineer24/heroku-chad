import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap } from "rxjs/operators";
import { LoginComponent } from "src/app/auth/pages";
import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private redirectUrl: string = "/";
  private loginUrl: string = "/auth/login";

  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    console.log("currentuservalue", this.currentUserSubject.value);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeed$() {
    return this._refreshNeeded$;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getLoginUrl(): string {
    return this.loginUrl;
  }

  public registerUsers(obj) {
    const url = `${this.baseUrl}/api/v2/users/register`;
    //const url = `api/v2/users/register`;
    return this.http.post(url, obj).pipe(map((data) => data));
  }

  // getPosts(): Observable<Posts[]> {
  //   const url = `${this.baseUrl}/api/v2/blogs`;
  //   console.log(url);
  //   return this.http.get<Posts[]>(url);
  // }

  getPosts(): Observable<Posts[]> {
    // const url = `${this.baseUrl}/api/v2/blogs`;
    const url = `api/v2/blogs`;
    console.log(url);
    return this.http.get<Posts[]>(url);
  }

  public verifyToken(token: string): Observable<any> {
    const url = `api/v2/users/verify/:token`;
    // url = `${this.baseUrl}/api/v2/users/verify/:token`;
    //const url = `verify/:token`;
    return this.http.post(url, token, { headers: this.headers }).pipe(
      tap((data) => {
        console.log(data);
        console.log("clicked");
      })
    );
  }

  // return this.http
  //   .post(`api/v2/users/verify/${params.token}`, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json"
  //     })
  //   })
  //   .subscribe(
  //     result => {
  //       console.log(result);
  //       console.log("clicked");
  //       //console.log(data);
  //       this.alertService.success("Verify Successful", true);
  //       this.router.navigate(["/auth/login"]);
  //     },
  //     error => {
  //       console.log(error);
  //       console.log("error");
  //     }
  //   );

  getToken(): string {
    return localStorage.getItem("token");
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/api/v2/users/login`;
    //const url = `api/v2/users/login`;
    return this.http
      .post<User>(url, { email, password })
      .pipe(
        map((user) => {
          console.log(user);

          if (user && user.token) {
            console.log("user", user);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            console.log(
              "currentuser: ",
              JSON.parse(localStorage.getItem("currentUser"))
            );

            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
