import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from "@angular/core";
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
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  //uploadedFilePath: string = null;

  uploadResponse = { status: "", message: "", filePath: "" };
  error: string;
  data;

  @ViewChild("myInput") eref;
  @ViewChild("myInput1")
  myInputVariable: ElementRef;
  myInputVariable1: ElementRef;

  isSubmitClicked: boolean;

  public shouldShow = true;

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
    console.log(localStorage.getItem("blog"));
  }

  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];

  //   this.previewUrl();
  // }

  onFileChange(event) {
    this.fileData = <File>event.target.files[0];
    this.postForm.get("image").setValue(this.fileData);
    this.fileData["value"];
    this.preview();
    console.log(this.shouldShow);

    // if (event.target !== undefined) {
    //   this.fd.append("image", this.fileData);
    //   return (this.postForm.value.image = this.fd);
    // }
  }

  preview() {
    // show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
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

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     // const file = event.target.files[0];
  //     // this.postForm.get("image").setValue(file);
  //     if (event.target !== undefined) {
  //       this.fd.append("image", event.target.files[0]);
  //       return (this.postForm.value.image = this.fd);
  //     }
  //   }
  // }

  onSubmit() {
    const formData = new FormData();
    formData.append("image", this.fileData);

    // if (e.target !== undefined) {
    //   this.fd.append("image", e.target.files[0]);
    //   return (this.postForm.value.image = this.fd);
    // }
    formData.append("title", this.postForm.value.title);
    formData.append("content", this.postForm.value.content);
    //formData.append("file", this.postForm.get("image").value);
    //this.preview;

    return this.postsService.upload(formData).subscribe(data => {
      console.log("data", data);
      if (data.message === "Saved") {
        this.eref.nativeElement.classList.add("hide");
      }
      this.data = data;
      console.log(this.eref.nativeElement);

      // console.log(this.fileData);
      // console.log(this.eref.nativeElement.classList);
      // this.myInputVariable.nativeElement;
      // this.myInputVariable.nativeElement.value = "";
      // this.fd = new FormData();
      //console.log("this.fd", this.fd);

      // console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(data)}`);
      this.postForm.reset();
    });
  }
}
