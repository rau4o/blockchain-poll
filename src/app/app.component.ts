import { Component } from '@angular/core';
import {Poll} from "./type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showForm: boolean = false;
  public activePoll = null;

  public polls: Poll[] = [
    {
      id: 1,
      question: 'Do you like dogs or cats',
      thumbnail: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
      results: [0, 5, 7],
      voted: true,
      options: ['Cats', 'Dogs']
    },
    {
      id: 1,
      question: 'Do you like dogs or cats',
      thumbnail: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
      results: [0, 5, 7],
      voted: false,
      options: ['June', 'July', 'August']
    }
  ];

  public setActivePoll(poll: Poll): void {
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100)
  }


}
