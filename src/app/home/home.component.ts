import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../posts/post';
import { PostService } from '../posts/post.service';

declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  pinnedPosts: Observable<any>;


  constructor(private postService: PostService) { }

  ngOnInit() {
    this.pinnedPosts = this.postService.getPinnedPosts();
  }

}
