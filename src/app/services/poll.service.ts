import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {Poll, PollForm} from "../type";

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  public getPolls(): Observable<Poll[]> {
    return of([
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
    ]).pipe(delay(2000));

  }

  public vote(pollId: number, voteNumber: number) {

  }

  public createPoll(poll: PollForm) {

  }
}
