import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../../../../core/services/post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Posts } from "../../../../core/models/posts";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  postForm: FormGroup;
  postSubs: Subscription;
  private posts: Posts[];
  private postsUpdated = new Subject<Posts[]>();
  fd = new FormData();
  constructor(
    public postsService: PostsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
    // this.postsService.refreshNeed$.subscribe(() => {
    //   this.getAllContent();
    // });
    // this.getAllContent();
  }

  initForm() {
    return (this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      body: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      image: [null, Validators.required],
    }));

    //this.postsService.getPosts();
  }

  onSubmit(e) {
    if (e.target !== undefined) {
      this.fd.append("image", e.target.files[0]);
      return (this.postForm.value.image = this.fd);
    }
    this.fd.append("title", this.postForm.value.title);
    this.fd.append("content", this.postForm.value.content);

    return this.postsService.upload(this.fd).subscribe((data) => {
      this.fd = new FormData();
      console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(data)}`);
      this.postForm.reset();
    });
  }
}
