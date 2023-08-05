import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showForm: boolean = false;

  public polls = [
    {
      question: 'Do you like dogs or cats',
      votes: [0, 5, 7, 1],
      voted: true
    },
    {
      question: 'Do you like dogs or cats',
      votes: [0, 5, 7, 2],
      voted: false
    }
  ];
}
