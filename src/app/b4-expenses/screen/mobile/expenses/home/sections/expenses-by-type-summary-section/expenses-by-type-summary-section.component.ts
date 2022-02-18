import {Component, OnInit} from '@angular/core';
import {ExpenseBasicStats} from "../../../../../../models/expenses/ExpenseBasicStats";
import {ExpenseStatsRepository} from "../../../../../../repositories/expenses/expense-stats-repository.service";
import {flatMap} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'expenses-by-type-stats-section',
  templateUrl: './expenses-by-type-summary-section.component.html',
  styleUrls: ['./expenses-by-type-summary-section.component.scss']
})
export class ExpensesByTypeSummarySectionComponent implements OnInit {

  data!: ExpenseByTypeSummaryTemplate | null;

  constructor(private expenseStatsRepository: ExpenseStatsRepository, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.data = new ExpenseByTypeSummaryTemplate();
    const template = this.data;
    this.expenseStatsRepository.getBasicRestaurantsStats().pipe(flatMap(data => {
      template.restaurantsBasicStats = data;
      return this.expenseStatsRepository.getBasicStoresStats()
    })).subscribe(data => {
      template.storeBasicStats = data;
      const total = template.storeBasicStats.total + template.restaurantsBasicStats.total;
      template.percentageStore = Math.round(template.storeBasicStats.total * 100 / total);
      template.percentageRestaurant = Math.round(template.restaurantsBasicStats.total * 100 / total);
    }, error => {
      this.data = null;
      this.logger.error('failed to load expenses stats by place type', {error});
    })
  }

}

export class ExpenseByTypeSummaryTemplate {
  percentageRestaurant!: number;
  percentageStore!: number;
  restaurantsBasicStats!: ExpenseBasicStats;
  storeBasicStats!: ExpenseBasicStats;
}
