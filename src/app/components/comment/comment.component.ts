import { Component, Input, OnInit } from '@angular/core';
import { CommentPayload } from 'src/app/models/comment.payload';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentPayload;

  constructor() { }

  ngOnInit(): void {
  }

}
