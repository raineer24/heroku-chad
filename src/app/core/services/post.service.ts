import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //   httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeed$() {
    return this._refreshNeeded$;
  }

  addPost(posts: Posts): Observable<Posts> {
    // const post: Content = data;
    // this.posts.push(post);
    // this.postsUpdated.next([...this.posts]);
    const url = `${this.baseUrl}/api/v2/blog`;
    return this.http.post<Posts>(url, posts).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
