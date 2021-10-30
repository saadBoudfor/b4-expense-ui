import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  @Input()
  icon = '';
  @Input()
  title = '';
  @Input()
  subTitle = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
