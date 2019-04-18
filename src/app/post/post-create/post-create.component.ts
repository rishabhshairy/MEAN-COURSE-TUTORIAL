import { PostService } from './../post.service';
import { Post } from './../../shared/model/post.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  get f() {
    return this.postForm.controls;
  }
  onSave(formDirective: FormGroupDirective) {
    this.postService.addPost(this.postForm.get('title').value, this.postForm.get('content').value);
    formDirective.resetForm();
    this.postForm.reset();
  }

}
