import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  
  posts: Observable<Post[]>;
  user: User;

  constructor(private postService: PostService,
              private authservice: AuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

  deletePost(id) {
    if(this.authservice.canDelete(this.user)) {
      alert('Are you sure ?')
      this.postService.deletePost(id);
    } else {
      this.notification.warnPermissions();
    }
  }
}
