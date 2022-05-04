import {Component, OnInit} from '@angular/core';
import {ExpensesStatsRepository} from "../../../repositories/expenses-stats-repository.service";
import {ExpenseBasicStats} from "../../../../b4-expenses/models/expenses/ExpenseBasicStats";
import {flatMap} from "rxjs/internal/operators";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'expenses-by-type',
  templateUrl: './expenses-by-type.component.html',
  styleUrls: ['./expenses-by-type.component.scss']
})
export class ExpensesByTypeComponent implements OnInit {

  restaurantStats!: ExpenseBasicStats;
  storesStats!: ExpenseBasicStats;
  percentageStores: number = 0;
  percentageRestaurant: number = 0;
  error: boolean = false;

  constructor(private expenseStatsRepository: ExpensesStatsRepository,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.expenseStatsRepository.getStores()
      .pipe(flatMap(storesStats => {
        this.storesStats = storesStats;
        return this.expenseStatsRepository.getRestaurants()
      })).subscribe(stats => {
      this.restaurantStats = stats;
      this.setPercentageValues();
      this.error = false;
      this.logger.info('load expenses stats data', {
        restaurants: this.restaurantStats,
        stores: this.storesStats
      });
    }, reason => {
      this.error = true;
      this.logger.error('failed to load expenses stats data', {reason});
    })
  }

  setPercentageValues() {
    if (!this.restaurantStats || !this.storesStats) return;
    const total = this.restaurantStats.total + this.storesStats.total;
    if (!total || total === 0) return;
    this.percentageRestaurant = this.restaurantStats.total / total * 100;
    this.percentageStores = this.storesStats.total / total * 100;
  }

}

const logId = '[ExpensesByTypeComponent] ';
