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

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject.value);
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
    return this.http.post(url, obj).pipe(map(data => data));
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
    //const url = `api/v2/users/verify/:token`;
    const url = `${this.baseUrl}/api/v2/users/verify/:token`;
    //const url = `verify/:token`;
    return this.http.post(url, token).pipe(
      tap(data => {
        console.log(data);
        console.log("clicked");
      })
    );
  }

  login(data): Observable<User> {
    const url = `${this.baseUrl}/api/v2/users/login`;
    //const url = `api/v2/users/login`;
    return this.http.post<User>(url, data).pipe(
      map(user => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));

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

// addPost(posts: Posts): Observable<Posts> {
//   // const post: Content = data;
//   // this.posts.push(post);
//   // this.postsUpdated.next([...this.posts]);
//   const url = `getPosts(): Observable<Posts[]> {
//   const url = `${this.baseUrl}/api/v2/blog`;
//   console.log(url);
//   return this.http.get<Posts[]>(url);
// }.baseUrl}/api/v2/blog`;
//   return this.hgetPosts(): Observable<Posts[]> {
//   const url = `${this.baseUrl}/api/v2/blog`;
//   console.log(url);
//   return this.http.get<Posts[]>(url);
// }st<Posts>(url, posts).pipe(
//     tap(() => {getPosts(): Observable<Posts[]> {
//   const url = `${this.baseUrl}/api/v2/blog`;
//   console.log(url);
//   return this.http.get<Posts[]>(url);
// }
//       this._refreshNeeded$.next();
//     })
//   );
// }

// upload(form) {
//   const url = `${this.baseUrl}/api/v2/blog`;
//   return this.http.post(url, form).pipe(
//     tap(() => {
//       this._refreshNeeded$.next();
//     })
//   );
// }
