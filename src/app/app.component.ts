import { Post } from './shared/model/post.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postStoredParent: Post [] = [];
  onPostAdded(post) {
    this.postStoredParent.push(post);
    console.log(post);
  }
}
