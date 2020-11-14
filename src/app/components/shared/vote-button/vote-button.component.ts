import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PostPayload } from 'src/app/models/post.payload';
import { VotePayload } from 'src/app/models/vote.payload';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  vote: VotePayload;
  @Input() post: PostPayload;

  constructor(private voteService: VoteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.vote = {
      postId: this.post.id,
      voteType: ''
    }
  }

  upVotePost() {
    this.vote.voteType = 'UPVOTE';
    this.voteService.votePost(this.vote).subscribe(
      resp => {
        this.post.voteCount++;
      },
      error => {
        this.toastr.error(
          'you are not allowed to upvote this post (' + this.post.name + ') twice',
          error.error.message);
      }
    );
  }
  downVotePost() {
    this.vote.voteType = 'DOWNVOTE';
    this.voteService.votePost(this.vote).subscribe(
      resp => {
        this.post.voteCount--;
      },
      error => {
        this.toastr.error(
          'you are not allowed to downvote this post (' + this.post.name + ') twice',
          error.error.message);
      }
    );
  }

}
