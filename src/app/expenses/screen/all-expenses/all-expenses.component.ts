import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {ExpenseInfo} from "../../models/ExpenseInfo";
import * as _ from 'lodash';
import {Dictionary} from 'lodash';
import {Router} from "@angular/router";

@Component({
  selector: 'all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  expenses!: Expense[];
  expensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  info!: ExpenseInfo;
  expenseDates!: string[];
  filter: 'all' | 'restaurants' | 'stores' = 'all';
  private restaurantsExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  private storesExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  private allExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  total = '0';
  count = '0';

  constructor(private expenseService: ExpenseService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.expenseService.fetchExpenses(0, 0).subscribe((data: Expense[]) => {
      this.expenses = data;
      this.allExpensesGroupedByDate = _.groupBy<Expense>(data, 'date');
      this.storesExpensesGroupedByDate = _.groupBy<Expense>(data.filter(expense => !expense.place || expense.place.type === 'STORE'), 'date');
      this.restaurantsExpensesGroupedByDate = _.groupBy<Expense>(data.filter(expense => expense.place && expense.place.type === 'RESTAURANT'), 'date');
      this.filterBy('all');
    })

    this.expenseService.getInfo().subscribe(info => this.info = info)
  }

  onSelectExpense($event: Expense) {
    this.router.navigate(['/expense-details'], {queryParams: {id: $event.id}});
  }

  filterBy(selected: 'all' | 'restaurants' | 'stores') {
    this.filter = selected;
    switch (selected) {
      case "all":
        this.expensesGroupedByDate = this.allExpensesGroupedByDate;
        this.total = this.info.weekTotal.toFixed(2);
        this.count = this.info.weekCount.toFixed(0);
        break;
      case "restaurants":
        this.expensesGroupedByDate = this.restaurantsExpensesGroupedByDate;
        this.total = this.info.weekTotalForRestaurant.toFixed(2);
        this.count = this.info.weekCountForRestaurant.toFixed(0);
        break
      case "stores":
        this.expensesGroupedByDate = this.storesExpensesGroupedByDate;
        this.total = this.info.weekTotalForStore.toFixed(2);
        this.count = this.info.weekCountForStore.toFixed(0);
        break;
    }
    this.expenseDates = Object.keys(this.expensesGroupedByDate);
  }
}
