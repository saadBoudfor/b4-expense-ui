import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bar-chart-item',
  templateUrl: './bar-chart-item.component.html',
  styleUrls: ['./bar-chart-item.component.scss']
})
export class BarChartItemComponent implements OnInit {
  @Input()
  month = 'Janvier';

  @Input()
  target = 205;

  @Input()
  total = 300;

  constructor() {
  }

  ngOnInit(): void {

  }

}
