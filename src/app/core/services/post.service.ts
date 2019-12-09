import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private baseUrl = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  //   httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeed$() {
    return this._refreshNeeded$;
  }

  upload(form) {
    const url = `${this.baseUrl}/api/v2/blogs`;
    return this.http.post(url, form).pipe(
      map(data => {
        console.log(data);
        const jsondata = JSON.stringify(data["blogs"]);
        console.log(jsondata);

        console.log(data["message"]);
        if (data["message"] == "Saved") {
          localStorage.setItem("blog", jsondata);
        }
      }),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  getBlogId(blog_id): Observable<any> {
    const url = `api/v2/blogs/${blog_id}`;
    console.log(url);

    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => {
        console.log(data);
      }),
      catchError(this.errorMgmt)
    );
  }

  updateBlog(blog: Posts): Observable<Posts> {
    return this.http.put<Posts>(this.baseUrl + blog.blog_id, blog);
  }

  // getPosts(): Observable<Posts[]> {
  //   const url = `${this.baseUrl}/api/v2/blogs`;
  //   console.log(url);
  //   return this.http.get<Posts[]>(url);
  // }

  getPosts() {
    // const url = `${this.baseUrl}/api/v2/blogs`;
    const url = `api/v2/blogs`;
    console.log(url);
    return this.http
      .get<Posts[]>("api/v2/blogs", { headers: this.headers })
      .pipe(
        map(data => {
          console.log(data);
          return data;
        })
      );
  }

  deletePost(id: number): Observable<Posts> {
    return this.http
      .delete<Posts>(this.baseUrl + id)
      .pipe(catchError(this.errorMgmt));
  }

  // error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
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
