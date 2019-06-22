import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../../../../core/services/post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Posts } from "../../../../core/models/posts";
import { ToastrService } from "ngx-toastr";
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
      content: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      image: [null, Validators.required]
    }));
    //this.postsService.getPosts();
  }

  // private getAllContent() {
  //   this.postsService
  //     .getPosts()
  //     .subscribe((posts: Content[]) => (this.posts = posts));
  // }

  // onFileChange(event) {
  //   let reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.postForm.patchValue({
  //         file: reader.result
  //       });

  //       // need to run CD since file load runs outside of zone
  //       this.cd.markForCheck();
  //     };
  //   }
  // }

  onSubmit(e) {
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
    // this.toastr.warning("CODE in-progress", "Under Construction", {
    //   timeOut: 200000,
    //   closeButton: true
    // });

    if (e.target !== undefined) {
      this.fd.append("image", e.target.files[0]);
      return (this.postForm.value.image = this.fd);
    }
    this.fd.append("title", this.postForm.value.title);
    this.fd.append("content", this.postForm.value.content);

    return this.postsService.upload(this.fd).subscribe(data => {
      this.fd = new FormData();
      console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(data)}`);
    });
  }
}
