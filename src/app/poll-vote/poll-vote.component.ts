import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ApexCharts from 'apexcharts';
import {PollVote} from "../type";

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements AfterViewInit {

  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() question: string;
  @Input() id: number;

  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter<PollVote>();

  public voteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.voteForm = this.formBuilder.group({
      selected: this.formBuilder.control('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  public submitForm(): void {
    const pollVoted: PollVote = {
      id: this.id,
      vote: this.voteForm.get('selected').value
    };
    this.pollVoted.emit(pollVoted);
  }

  private generateChart(): void {
     const options: ApexCharts.ApexOptions = {
       series: [
         {
           data: this.results
         },
       ],
       chart: {
         height: 350,
         type: 'bar',
       },
       plotOptions: {
         bar: {
           columnWidth: '45%',
           distributed: true,
         },
       },
       legend: {
         show: false,
       },
       xaxis: {
         categories: this.options
       },
     };

     const chart = new ApexCharts(document.getElementById('poll-results'), options);
     chart.render();
  }
}
