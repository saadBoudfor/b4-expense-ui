import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {Router} from "@angular/router";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";
import {flatMap} from "rxjs/operators";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expenseBasicStats: ExpenseBasicStats = new ExpenseBasicStats();
  expenses!: Expense[];

  percentageRestaurant = 0;
  percentageStore = 0;
  restaurantsBasicStats!: ExpenseBasicStats;
  storeBasicStats!: ExpenseBasicStats;

  constructor(private expenseService: ExpenseService, private router: Router) {
  }

  ngOnInit(): void {

    this.expenseService.getBasicStats().pipe(flatMap(data => {
      this.expenseBasicStats = data;
      return this.expenseService.getBasicRestaurantsStats();
    }), flatMap(data => {
      this.restaurantsBasicStats = data;
      return this.expenseService.getBasicStoresStats()
    })).subscribe(data => {
      this.storeBasicStats = data;
      const total = this.storeBasicStats.total + this.restaurantsBasicStats.total;
      this.percentageStore = Math.round(this.storeBasicStats.total * 100 / total);
      this.percentageRestaurant = Math.round(this.restaurantsBasicStats.total * 100 / total);
    })

    this.expenseService.fetchLastExpenses().subscribe(data => this.expenses = data);

  }

  onExpenseClick(expense: Expense) {
    // handle expense click event
    this.router.navigate(['/expense-details'], {queryParams: {id: expense.id}})
  }


}

