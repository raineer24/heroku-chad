import { Component, OnInit } from "@angular/core";
import { Posts } from "../../../../core/models/posts";
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../../../../core/services/post.service";
@Component({
  selector: "posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"]
})
export class PostsListComponent implements OnInit {
  posts: Posts[] = [];
  userData: {
    blog_id: string;
  };

  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
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

  editBlog(blog: Posts): void {
    window.localStorage.setItem("editBlogId", blog.blog_id.toString());
    this.router.navigate(["posts-edit"]);
  }

  deleteBlog(blog: Posts): void {
    this.postsService.deletePost(blog.blog_id).subscribe(data => {
      this.router.navigate(["posts"]);
    });
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
