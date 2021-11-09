import {Component} from '@angular/core';
import {EChartsOption} from "echarts";
import {ExpenseService} from "../../expenses/services/expense.service";

@Component({
  selector: 'nutrients-stats',
  templateUrl: './nutrients-stats.component.html',
  styleUrls: ['./nutrients-stats.component.scss']
})
export class NutrientsStatsComponent {

  option!: EChartsOption;

  constructor(private expenseService: ExpenseService) {
    this.expenseService.getNutrientBasicStats().subscribe((data: { stats: { count: number, label: string }[] }) => {
      chartConf.series[0].data = data.stats.map(item => {
        return {value: item.count, name: item.label.toUpperCase()}
      });
      this.option = chartConf as EChartsOption;
    })
  }

}

let chartConf = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      color: [
        '#795548',
        '#ddbea9',
        '#ffe8d6',
        '#b7b7a4',
        '#6b705c'
      ],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 1048, name: 'Search Engine'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'}
      ]
    }
  ]
}
