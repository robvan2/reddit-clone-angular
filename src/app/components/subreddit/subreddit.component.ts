import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostPayload } from 'src/app/models/post.payload';
import { Subreddit } from 'src/app/models/subreddit';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit {
  subreddit: Subreddit;
  posts: PostPayload[];

  constructor(private subredditService: SubredditService, private postService: PostService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id: Number = this.activateRoute.snapshot.params.id;
    this.subredditService.getSubredditById(id).subscribe(subreddit => {
      this.subreddit = subreddit;

    });
    this.postService.getAllPostsBySubreddit(id).subscribe(posts => {
      this.posts = posts
    })
  }

}
