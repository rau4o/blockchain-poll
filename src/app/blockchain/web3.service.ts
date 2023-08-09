import {Injectable, NgZone} from "@angular/core";
import Web3, {ContractAbi} from "web3";
import {Contract} from 'web3-eth-contract';
import {Observable} from "rxjs";

const contractAbi = require("./contractABI.json");
declare var window: any;

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
    matic: any;
  }
}


@Injectable({
  providedIn: 'root'
})

export class Web3Service {

  private web3: Web3;
  private contract: Contract<any>;
  private contractAddress = '0x389A185d1737c09aCB14e82D92774222727A22Da';

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);
      window.ethereum.enable();
    } else {
      console.warn('Metamask not found. Install or enable Metamask');
    }
  }

  public getAccount(): Promise<string> {
    return this.web3.eth.requestAccounts().then( accounts => accounts[0] || '');
  }

  public async executeTransaction(functionName: string, ...args: any[]): Promise<void> {
    const account = await this.getAccount();
    this.contract.methods[functionName].apply(null, args).send({ from: account,  gas: 1500000, gasPrice: '30000000000000'})
  }

  async call(functionName: string, ...args: any[]) {
    const account = await this.getAccount();
    return this.contract.methods[functionName].apply(null, args).call({ from: account})
  }

  public onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on('data', (data) => {
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues
          })
        })
      });
    })
  }
}
