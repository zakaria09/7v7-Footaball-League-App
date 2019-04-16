import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  postForm: FormGroup;
  imageURL: string;
  displayName: string;

  uploadPercentage: Observable<number>
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;

  constructor(private postService: PostService,
              private auth: AuthService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required),
    }); 
    this.auth.user.subscribe(auth => {
      this.displayName = auth.displayName;
    });
  }

  onSubmit(data) {
    const formData: Post = {
      author: this.displayName,
      image: this.imageURL,
      title: data.value.title,
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

  startUpload(event) {
    const file = event.item(0);
    if(file.type.split('/')[0] !== 'image') {
      alert('Only images please!');
    }
    // storage path 
    const path = `test/${new Date().getTime()}_${file.name}`;
    // upload the path and the file
    this.task = this.storage.upload(path, file);
    // make a reference to the file path
    let ref = this.storage.ref(path);
    // assign the uploadPercentage to the percentageChanges
    this.uploadPercentage = this.task.percentageChanges();
    // get url and subscribe
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.imageURL = url;
          console.log(url);
        });
      }
      )
    ).subscribe();
  }
}
