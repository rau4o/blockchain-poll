import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Poll, PollForm} from "../type";
import {Web3Service} from "../blockchain/web3.service";
import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient, private web3: Web3Service) { }

  public async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];
    const totalPolls = await this.web3.call('getTotalPolls');
    const account = await this.web3.getAccount();
    const voter = await this.web3.call('getVoters', account);
    const voterNormalize = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalize);
      polls.push(pollNormalized);
    }
    return polls;

  }

  public vote(pollId: number, voteNumber: number) {
    this.web3.executeTransaction('vote', pollId, voteNumber);
  }

  public createPoll(poll: PollForm) {
    this.web3.executeTransaction('createPoll', poll.question, poll.thumbnail || '', poll.options.map(opt => fromAscii(opt) + '000000000000000000000000000000000000000000000000000000000000'));
  }

  private normalizeVoter(voter) {
    return {
      id: voter[0],
      votedIds: voter[1].map(vote => parseInt(vote))
    }
  }

  private normalizePoll(pollRow, voter): Poll {
    return {
      id: parseInt(pollRow[0]),
      question: pollRow[1],
      thumbnail: pollRow[2],
      results: pollRow[3].map(vote => parseInt(vote)),
      options: pollRow[4].map(opt => toAscii(opt).replace(/\u0000/g, '')),
      voted: voter.votedIds.length && voter.votedIds.find(voteId => voteId === parseInt(pollRow[0])) !== undefined,
    }
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
