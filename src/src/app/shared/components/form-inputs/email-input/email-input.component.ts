import {Component, EventEmitter, Input, OnInit, Output, Self, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-email-input[formControl]',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements OnInit {
  regex: RegExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]');
  @Input() formControl!: FormControl;

  ngOnInit(): void {
    this.formControl.addValidators((control) => {
      if (!this.regex.test(control.value)) {
        return {email: true};
      }
      return null;
    })
  }
}
