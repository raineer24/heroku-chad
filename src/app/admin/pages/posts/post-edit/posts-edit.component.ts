import { Component, OnInit } from "@angular/core";
import { Posts } from "../../../../core/models/posts";
import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../../../../core/services/post.service";
@Component({
  selector: "posts-edit",
  templateUrl: "./posts-edit.component.html",
  styleUrls: ["./posts-edit.component.scss"]
})
export class PostsEditComponent implements OnInit {
  posts: Posts[] = [];
  userData: {
    blog_id: string;
  };

  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => console.log(params));

    this.postsService.refreshNeed$.subscribe(() => {
      this.getAllPosts();
    });

    this.getAllPosts();

    // this.postsService.getBlogId(this.userData.blog_id).subscribe(data => {
    //   console.log(data);
    // });
  }

  private getAllPosts() {
    this.postsService.getPosts().subscribe((posts: Posts[]) => {
      console.log(posts);

      this.posts = posts;
      console.log(this.posts[0]);

      console.log(posts["blogs"]);
    });
  }
}
