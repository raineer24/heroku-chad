import { Posts } from "./../models/posts";
import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpEventType
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
    return this.http
      .post<any>(url, form, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map(data => {
          if (data.type === HttpEventType.UploadProgress) {
            console.log("yes yes show");
          } else {
            console.log("not");
          }

          switch (data.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * data.loaded) / data.total);
              // console.log(progress);

              return { status: "progress", message: progress };

            case HttpEventType.Response:
              return data.body;
            default:
              return `Unhandled data: ${data.type}`;
          }
          // console.log(data);
          // const jsondata = JSON.stringify(data["blogs"]);
          // console.log(jsondata);

          // console.log(data["message"]);
          // if (data["message"] == "Saved") {
          //   localStorage.setItem("blog", jsondata);
          // }
        }),
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  getBlogId(blog_id): Observable<any> {
    const url = `${this.baseUrl}/api/v2/blogs/${blog_id}`;
    //const url = `api/v2/blogs/${blog_id}`;
    //console.log(url);

    return this.http.get(url, { headers: this.headers }).pipe(
      map(response => {
        //console.log(response["data"][0]);
        return response["data"][0];
      }),
      catchError(this.errorMgmt)
    );
  }

  updateBlog(blog: Posts) {
    return this.http.put(this.baseUrl + blog.blog_id, blog);
  }

  // updateBlog(id, post): Observable<any> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.put(url, post, httpOptions).pipe(
  //     tap(_ => console.log(`updated post id=${id}`)),
  //     catchError(this.errorMgmt<any>("updateProduct"))
  //   );
  // }

  // getPosts(): Observable<Posts[]> {
  //   const url = `${this.baseUrl}/api/v2/blogs`;
  //   console.log(url);
  //   return this.http.get<Posts[]>(url);
  // }

  getPosts() {
    const url = `${this.baseUrl}/api/v2/blogs`;
    //const url = `api/v2/blogs`;
    console.log(url);
    return this.http.get<Posts[]>(url, { headers: this.headers }).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  deletePost(id: string) {
    const url = `${this.baseUrl}/api/v2/blogs/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted post id = ${id}`)),
      catchError(this.errorMgmt)
    );
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
