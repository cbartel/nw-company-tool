import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.css']
})
export class HomeIconComponent implements OnInit {
  @Input()
  label: string = '';

  constructor() {}

  ngOnInit(): void {}
}
