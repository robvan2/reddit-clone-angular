import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/models/comment.payload';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  comment: CommentPayload;
  commentForm: FormGroup;
  @Input() postId: Number;
  @Output() addComment: EventEmitter<CommentPayload> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.comment = {
      postId: this.postId,
      text: '',
    }
  }

  postComment() {
    this.comment.text = this.commentForm.get('text').value;
    this.addComment.emit(this.comment);
  }

}
