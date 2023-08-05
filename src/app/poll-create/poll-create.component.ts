import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PollForm} from "../type";

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  public pollForm: FormGroup;

  @Output() pollCreated: EventEmitter<PollForm> = new EventEmitter<PollForm>();

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
    const formData: PollForm = {
      question: this.pollForm.get('question').value,
      thumbnail: this.pollForm.get('image').value,
      options: [
        this.pollForm.get('op1').value,
        this.pollForm.get('op2').value,
        this.pollForm.get('op3').value,
      ]
    };
    this.pollCreated.emit(formData);
  }

}
