import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Posts } from "../../../../core/models/posts";
import { PostsService } from "../../../../core/services/post.service";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./posts-detail.component.html",
  styleUrls: ["./posts-detail.component.scss"]
})
export class PostsDetailComponent implements OnInit {
  id = this.route.snapshot.params["id"];
  //id: number;
  data: Posts;
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.data = new Posts();
  }

  post: Posts = {
    blog_id: "",
    title: "",
    content: "",
    created_at: "",
    updated_at: "",
    image_url: ""
  };

  ngOnInit() {
    console.log(localStorage.getItem("blog"));

    //console.log(this.route.snapshot.params.get("id"));

    //console.log(id);

    //console.log(id);

    this.postService.getBlogId(this.id).subscribe(data => {
      this.post = data;
      console.log(this.post);
    });

    // this.route.paramMap.subscribe(params => {
    //   console.log(params.get("blog_id"));
    //   console.log(params);

    //   this.postService.getBlogId(params.get("blog_id")).subscribe(b => {
    //     console.log(b);
    //   });
    // });

    const x = "tae";
    console.log(typeof x);
  }
}
