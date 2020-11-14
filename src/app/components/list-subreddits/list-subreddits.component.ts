import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {
  subreddits: Array<Subreddit>;
  constructor(private subredditService: SubredditService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    },
      error => {
        this.toastr.error('Can\'t get subreddits list from server');
      });
  }

}
