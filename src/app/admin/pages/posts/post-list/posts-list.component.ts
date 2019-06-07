import { Component } from "@angular/core";
import { Posts } from "../../../../core/models/posts";

@Component({
  selector: "posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"]
})
export class PostsListComponent {
  posts: Posts[] = [];
}
