import {Component} from '@angular/core';
import {EChartsOption} from "echarts";
import {ExpenseRepository} from "../../b4-expenses/repositories/expenses/expense-repository.service";
import {ExpenseStatsRepository} from "../../b4-expenses/repositories/expenses/expense-stats-repository.service";

@Component({
  selector: 'nutrients-stats',
  templateUrl: './nutrients-stats.component.html',
  styleUrls: ['./nutrients-stats.component.scss']
})
export class NutrientsStatsComponent {

  option!: EChartsOption;

  constructor(private expenseService: ExpenseRepository, private expenseStatsRepository: ExpenseStatsRepository,) {
    this.expenseStatsRepository.getNutrientBasicStats().subscribe((data: { stats: { count: number, label: string }[] }) => {
      chartConf.series[0].data = data.stats.map(item => {
        return {value: item.count, name: item.label ? item.label.toUpperCase() : 'inconnu'}
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
        '#bc6c25',
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