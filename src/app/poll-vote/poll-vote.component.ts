import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

  options = ['Monday', 'Tuesday', 'Friday'];
  public voteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.voteForm = this.formBuilder.group({
      selected: this.formBuilder.control('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  public submitForm(): void {

  }

}
