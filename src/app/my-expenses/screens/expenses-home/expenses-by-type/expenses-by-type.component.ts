import {Component, OnInit} from '@angular/core';
import {ExpensesStatsRepository} from "../../../repositories/expenses-stats-repository.service";
import {ExpenseBasicStats} from "../../../../b4-expenses/models/expenses/ExpenseBasicStats";

@Component({
  selector: 'expenses-by-type',
  templateUrl: './expenses-by-type.component.html',
  styleUrls: ['./expenses-by-type.component.scss']
})
export class ExpensesByTypeComponent implements OnInit {

  restaurantStats!: ExpenseBasicStats;
  storesStats!: ExpenseBasicStats;
  percentageStores!: number;
  percentageRestaurant!: number;

  constructor(private expenseStatsRepository: ExpensesStatsRepository) {
  }

  ngOnInit(): void {
    this.expenseStatsRepository.getRestaurants()
      .subscribe(stats => {
        this.restaurantStats = stats;
        this.setPercentageValues();
      })
    this.expenseStatsRepository.getStores()
      .subscribe(stats => {
        this.storesStats = stats;
        this.setPercentageValues();
      })


  }

  setPercentageValues() {
    if (this.restaurantStats && this.storesStats) {
      const total = this.restaurantStats.total + this.storesStats.total;
      this.percentageRestaurant = this.restaurantStats.total / total * 100;
      this.percentageStores = this.storesStats.total / total * 100;
    }
  }

}
