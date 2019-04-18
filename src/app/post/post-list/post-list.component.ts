import { PostService } from './../post.service';
import { Post } from './../../shared/model/post.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  myPosts: Post[] = [];
  postSubscription: Subscription;
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdtedListener()
      .subscribe((data: Post[]) => {
        this.myPosts = data;
      });
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

}
