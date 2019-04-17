import { Post } from './../../shared/model/post.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  get f() {
    return this.postForm.controls;
  }
  onSave() {
    const post: Post = {
      title: this.postForm.get('title').value,
      content: this.postForm.get('content').value
    };
    this.postCreated.emit(post);
  }

}
