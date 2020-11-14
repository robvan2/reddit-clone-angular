import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostPayload } from 'src/app/models/post.payload';
import { Subreddit } from 'src/app/models/subreddit';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  subreddits: Array<Subreddit>;
  post: PostPayload;

  constructor(private subredditService: SubredditService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.post = {
      name: '',
      subredditName: '',
      url: '',
      description: ''
    }
    this.subredditService.getAllSubreddits().subscribe(
      subreddits => {
        this.subreddits = subreddits;
      },
      error => {
        throwError(error);
      })
  }
  createPost() {
    this.post.name = this.createPostForm.get('postName').value;
    this.post.subredditName = this.createPostForm.get('subredditName').value;
    this.post.url = this.createPostForm.get('url').value;
    this.post.description = this.createPostForm.get('description').value;

    this.postService.create(this.post).subscribe(
      data => {
        this.toastr.success('Post created successfully');
        this.router.navigateByUrl('/');
      },
      error => {
        throwError(error);
      }
    );
  }
  discard() {

  }
}
