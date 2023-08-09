import {Component, OnInit} from '@angular/core';
import {Poll, PollForm, PollVote} from "./type";
import {PollService} from "./services/poll.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public showForm: boolean = false;
  public activePoll: Poll = null;

  public polls = this.pollService.getPolls();

  constructor(private pollService: PollService) {
  }

  ngOnInit(): void {
    this.pollService.onEvent('PollCreated').subscribe(_ => {
      this.polls = this.pollService.getPolls();
    })
  }

  public setActivePoll(poll: Poll): void {
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100)
  }

  public handlePollCreate(poll: PollForm): void {
    this.pollService.createPoll(poll);
  }

  public handlePollVote(poll: PollVote): void {
   this.pollService.vote(poll.id, poll.vote);
  }
}
