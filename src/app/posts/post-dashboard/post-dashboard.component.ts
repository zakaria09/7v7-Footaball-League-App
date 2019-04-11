import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  postForm: FormGroup;
  imageURL: string;
  displayName: string;

  constructor(private postService: PostService,
              private auth: AuthService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'draft': new FormControl(false),
    }); 
    this.auth.user.subscribe(auth => {
      this.displayName = auth.displayName;
    });
  }

  // createForm() {
  //   this.postForm = this.fb.group({
  //     title: [''],
  //     content: [''],
  //     draft: false
  //   });
  // }

  onSubmit(data) {
    const formData: Post = {
      author: this.displayName,
      title: data.value.title,
      image: this.imageURL || null,
      content: data.value.content,
      draft: data.value.draft,
      published: new Date(),
      likes: 0
    }
    if (!this.postForm.untouched) {
      return this.postService.createPost(formData);
    }
    this.postForm.reset();
  }
}
