import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, catchError, first } from "rxjs/operators";
import { LoginComponent } from "src/app/auth/pages";
import { User } from "../models/user";
import { Status } from "../models/positions";
import { UserFetch } from "../models/userfetch";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private redirectUrl: string = "/";
  private loginUrl: string = "/auth/login";

  headers = new HttpHeaders().set("Content-Type", "application/json");

  professional: Status[] = [
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Other", value: "Other" },
  ];

  positions: any[] = [
    "Programmer",
    "Businness Analyst",
    "Designer",
    "DBA",
    "Other",
  ];

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    // console.log("currentuservalue", this.currentUserSubject.value);
  }

  getAllStatus() {
    return this.professional;
  }

  getAllPositions() {
    return this.positions;
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

  /**
   *
   *
   * @returns {Observable<User[]>}
   *
   * @memberof UserService
   */
  getUserDetail(): Observable<any> {
    //  console.log("token", token);

    const user_id = JSON.parse(localStorage.getItem("currentUser")).user.id;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    const url = `/api/v2/users/${user_id}`;

    return this.http
      .get(url, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
      })
      .pipe(
        map((user) => {
          console.log("user", user["user"]);

          return user["user"];
        }),
        catchError(this.errorMgmt)
      );
  }

  saveStatus(position) {
    console.log(JSON.stringify(position));
  }

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

  public createProfile(data): Observable<any> {
    const url = `/api/v2/users/profile`;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
      })
      .pipe(
        tap((data) => {
          console.log(data);
          console.log("clicked");
          this.router.navigate(["/admin/dashboard"]);
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );

    //  const user_id = JSON.parse(localStorage.getItem("currentUser")).user.id;
    //  const token = JSON.parse(localStorage.getItem("currentUser")).token;
    //  const url = `/api/v2/users/${user_id}`;

    //  return this.http
    //    .get(url, {
    //      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    //    })
    //    .pipe(
    //      map((user) => {
    //        console.log("user", user["user"]);

    //        return user["user"];
    //      }),
    //      catchError(this.errorMgmt)
    //    );

    // if (this.myform.valid) {
    // let url = "https://reqres.in/api/users";
    //     const headers = new HttpHeaders()
    //       .set('Authorization', 'my-auth-token')
    //       .set('Content-Type', 'application/json');
    //   this.http.post(url, user).subscribe(res => console.log("Data Post Done"));
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
    const json = JSON.stringify({ email: email, password: password });
    const url = `${this.baseUrl}/api/v2/users/login`;
    //const url = `api/v2/users/login`;
    return this.http
      .post<User>(url, json, { headers: this.headers })
      .pipe(
        map((user) => {
          //   console.log(user);

          if (user && user.token) {
            //  console.log("user", user);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            // console.log(
            //   "currentuser: ",
            //   JSON.parse(localStorage.getItem("currentUser"))
            // );

            this.currentUserSubject.next(user);
          }

          return user;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  getUser(id: string): Observable<UserFetch> {
    //const url = `${this.apiurl}/${id}`;
    // return this.http.get<User>(`${baseUrl}/${id}`);
    const url = `${this.baseUrl}/api/v2/users/profile/${id}`;
    return this.http.get<UserFetch>(url).pipe(
      map((user) => {
        console.log("user", user["user"]);

        return user["user"];
      }),
      catchError(this.errorMgmt)
    );
  }

  update(id: string, params) {
    const url = `${this.baseUrl}/api/v2/users/profile/${id}`;
    return this.http.put(`${url}`, params);
  }

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    console.log("logout");
  }

  // error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    console.log("error", error);

    if (error.error instanceof ErrorEvent) {
      // get client-side error
      errorMessage = error.error.message;
    } else {
      // get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
