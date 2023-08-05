import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  public pollForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.pollForm = this.formBuilder.group({
      question: this.formBuilder.control('', [Validators.required]),
      image: this.formBuilder.control(''),
      op1: this.formBuilder.control(''),
      op2: this.formBuilder.control(''),
      op3: this.formBuilder.control(''),
    })
  }

  ngOnInit(): void {
  }

  public submitForm(): void {
    console.log(this.pollForm.value);
  }

}
