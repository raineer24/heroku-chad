import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap } from "rxjs/operators";
import { LoginComponent } from "src/app/auth/pages";
import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log("this", this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeed$() {
    return this._refreshNeeded$;
  }

  public registerUsers(obj) {
    const url = `${this.baseUrl}/api/v2/useraccount/signup`;
    return this.http
      .post(url, obj, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(map(data => data));
  }

  getPosts(): Observable<Posts[]> {
    const url = `${this.baseUrl}/api/v2/blog`;
    console.log(url);
    return this.http.get<Posts[]>(url);
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/api/v2/useraccount/login`;
    return this.http.post<any>(url, { email, password }).pipe(
      map(user => {
        console.log("user", user);
        console.log("tae");

        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          const user1 = JSON.parse(localStorage.getItem("currentUser"));
          console.log("user1", user1.token);

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
