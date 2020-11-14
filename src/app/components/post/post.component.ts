import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { PostPayload } from 'src/app/models/post.payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: PostPayload;
  faComments = faComments;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(postId: Number) {
    this.router.navigateByUrl('/posts/' + postId);
  }
  upVotePost() {

  }

}
