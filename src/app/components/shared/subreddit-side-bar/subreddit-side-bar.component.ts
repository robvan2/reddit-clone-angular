import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<Subreddit>;
  displayViewAll: Boolean = false;
  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      if (subreddits.length > 4) {
        this.subreddits = subreddits.slice(0, 3);
        this.displayViewAll = true;
      } else {
        this.displayViewAll = false;
        this.subreddits = subreddits;
      }
    })
  }


}
