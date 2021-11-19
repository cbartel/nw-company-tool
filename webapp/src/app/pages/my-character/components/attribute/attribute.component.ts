import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  @Input()
  label!: string;

  value = 0;

  @Input()
  form!: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((newValue) => {
      if (newValue !== null && this.form.valid) {
        this.value = newValue;
      }
    });
  }

  increment(): void {
    if (this.value < 999) {
      this.form.setValue(this.value + 1);
    }
  }

  decrement(): void {
    if (this.value > 0) {
      this.form.setValue(this.value + -1);
    }
  }
}
