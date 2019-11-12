import { Component, OnInit } from "@angular/core";
import { Posts } from "../../../../core/models/posts";
import { PostsService } from "../../../../core/services/post.service";
@Component({
  selector: "posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"]
})
export class PostsListComponent implements OnInit {
  posts: Posts[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.refreshNeed$.subscribe(() => {
      this.getAllPosts();
    });

    this.getAllPosts();
  }

  private getAllPosts() {
    this.postsService.getPosts().subscribe((posts: Posts[]) => {
      this.posts = posts;
      console.log(this.posts);

      console.log(posts["blogs"]);
    });
  }
}
