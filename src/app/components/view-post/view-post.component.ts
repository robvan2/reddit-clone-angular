import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { CommentPayload } from 'src/app/models/comment.payload';
import { PostPayload } from 'src/app/models/post.payload';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: PostPayload;
  postId: Number;
  comments: CommentPayload[];

  constructor(private postService: PostService,
    private commentService: CommentService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
    });
    this.commentService.getCommentsByPost(this.postId).subscribe(comments => {
      this.comments = comments;
    })
  }
  postComment(comment: CommentPayload) {
    this.commentService.postComment(comment).subscribe(data => {
      this.comments.push(data);
    });

  }


}
