import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //   httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

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
