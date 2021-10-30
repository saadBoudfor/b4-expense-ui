import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rounded-icon',
  templateUrl: './rounded-icon.component.html',
  styleUrls: ['./rounded-icon.component.scss']
})
export class RoundedIconComponent implements OnInit {

  @Input()
  icon = 'payment';

  @Input()
  fill = false;

  @Input()
  color: 'primary' | 'accent' = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
