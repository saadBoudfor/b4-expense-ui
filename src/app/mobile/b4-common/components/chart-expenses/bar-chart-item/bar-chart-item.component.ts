import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from "../../../../../services/common/config.service";

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

  theme!: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getSelectedTheme().subscribe(theme => this.theme = theme)
  }

}
