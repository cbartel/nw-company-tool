import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Attribute } from '@nw-company-tool/model';

@Component({
  selector: 'app-trade-skill',
  templateUrl: './trade-skill.component.html',
  styleUrls: ['./trade-skill.component.css']
})
export class TradeSkillComponent implements OnInit {
  @Input()
  attribute: Attribute;

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

  increment(): void {
    if (this.value < 200) {
      this.form.setValue(this.value + 1);
    }
  }

  decrement(): void {
    if (this.value > 0) {
      this.form.setValue(this.value - 1);
    }
  }
}
