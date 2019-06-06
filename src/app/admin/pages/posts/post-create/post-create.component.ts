import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../../../../core/services/post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Posts } from "../../../../core/models/posts";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  postForm: FormGroup;
  postSubs: Subscription;
  private posts: Posts[];
  private postsUpdated = new Subject<Posts[]>();
  constructor(public postsService: PostsService, private fb: FormBuilder) {}
  public showMessage = false;

  ngOnInit() {
    this.initForm();
    // this.postsService.refreshNeed$.subscribe(() => {
    //   this.getAllContent();
    // });
    // this.getAllContent();
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      content: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
    //this.postsService.getPosts();
  }

  // private getAllContent() {
  //   this.postsService
  //     .getPosts()
  //     .subscribe((posts: Content[]) => (this.posts = posts));
  // }

  onSubmit() {
    //const values = this.postForm.value;
    // if (this.postForm.valid) {
    //   const data = {
    //     title: values.title,
    //     content: values.content
    //   };
    //   this.postSubs = this.postsService.addPost(data).subscribe(data => {
    //     console.log(data);
    //   });
    // }
    // this.postsService.addPost(this.postForm.value).subscribe(posts => {
    //   console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(posts)}`);
    // });

    setTimeout(() => {
      alert("Under Construction");
    }, 2000);
  }
}
