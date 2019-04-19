import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { User } from 'src/app/auth/user.model';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  fbIcon = faFacebookSquare;
  tweetIcon = faTwitterSquare;
  lnkedinIcon = faLinkedin;
  
  posts: Observable<Post[]>;
  user: User;
  userinfo;

  name = '@ngx-share/buttons';

  constructor(private postService: PostService,
              private authservice: AuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.authservice.user.subscribe(user => this.user = user);
  }

  deletePost(id) {
    if(this.authservice.canDelete(this.user)) {
      this.notification.warnMessage('Post has been deleted!')
      this.postService.deletePost(id);
    } else {
      this.notification.warnPermissions();
    }
  }

  addLikes(id , obj) {
    this.postService.incrementLikes(id, obj);
  }

  pinPost(id) {
    this.notification.successMessage('Post has now been pinned to the homepage!');
    this.postService.pinToHomepage(id);
  }
}
