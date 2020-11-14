import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subreddit: Subreddit;

  constructor(private router: Router,
    private subredditService: SubredditService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subreddit = {
      name: '',
      description: ''
    }
  }
  createSubreddit() {
    this.subreddit.name = this.createSubredditForm.get('title').value;
    this.subreddit.description = this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddit(this.subreddit).subscribe(
      data => {
        this.toastr.success('Subreddit ' + data.name + ' created successfully (id=' + data.id + ')');
        this.router.navigateByUrl('/subreddits');
      },
      error => {
        this.toastr.error('Something went wrong while creating subreddit');
        console.log(error);
      });
  }
  discard() {
    this.router.navigateByUrl('/');
  }

}
