import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weapon-mastery',
  templateUrl: './weapon-mastery.component.html',
  styleUrls: ['./weapon-mastery.component.css']
})
export class WeaponMasteryComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  form!: FormControl;

  value = 0;

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((newValue) => {
      if (newValue !== null && this.form.valid) {
        this.value = newValue;
      }
    });
  }

  increment() {
    if (this.value < 20) {
      this.form.setValue(this.value + 1);
    }
  }

  decrement() {
    if (this.value > 0) {
      this.form.setValue(this.value - 1);
    }
  }
}
