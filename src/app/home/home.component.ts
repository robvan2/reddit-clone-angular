import { Component, OnInit } from '@angular/core';
import { PostPayload } from '../models/post.payload';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Array<PostPayload> = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.allPosts().subscribe(posts => {
      this.posts$ = posts;
    })
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
