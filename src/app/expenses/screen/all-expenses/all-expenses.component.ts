import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import * as _ from 'lodash';
import {Dictionary} from 'lodash';
import {Router} from "@angular/router";
import {flatMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";

@Component({
  selector: 'all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit, OnDestroy {
  expenses!: Expense[];
  expensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  expenseBasicStats!: ExpenseBasicStats;
  expenseDates!: string[];
  filter: 'all' | 'restaurants' | 'stores' = 'all';
  private restaurantsExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  private storesExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  private allExpensesGroupedByDate!: Dictionary<[Expense, ...Expense[]]>;
  total = '0';
  count = '0';
  private $getDataSubscription!: Subscription;

  constructor(private expenseService: ExpenseService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.$getDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.$getDataSubscription = this.expenseService.getBasicStats().pipe(flatMap(data => {
      this.updateStats(data);
      return this.expenseService.fetchExpenses(0, 0);
    })).subscribe((data: Expense[]) => {
      this.expenses = data;
      this.allExpensesGroupedByDate = _.groupBy<Expense>(data, 'date');
      this.storesExpensesGroupedByDate = _.groupBy<Expense>(data.filter(expense => !expense.place || expense.place.type === 'STORE'), 'date');
      this.restaurantsExpensesGroupedByDate = _.groupBy<Expense>(data.filter(expense => expense.place && expense.place.type === 'RESTAURANT'), 'date');
      this.filterBy('all');
    });
  }

  onSelectExpense($event: Expense) {
    this.router.navigate(['/expense-details'], {queryParams: {id: $event.id}});
  }

  filterBy(selected: 'all' | 'restaurants' | 'stores') {
    this.filter = selected;
    switch (selected) {
      case "all":
        this.expensesGroupedByDate = this.allExpensesGroupedByDate;
        this.expenseService.getBasicStats().subscribe(data => {
          this.updateStats(data);
        })
        break;
      case "restaurants":
        this.expensesGroupedByDate = this.restaurantsExpensesGroupedByDate;
        this.expenseService.getBasicRestaurantsStats().subscribe(data => {
          this.updateStats(data);
        })
        break
      case "stores":
        this.expensesGroupedByDate = this.storesExpensesGroupedByDate;
        this.expenseService.getBasicStoresStats().subscribe(data => {
          this.updateStats(data);
        })
        break;
    }
    this.expenseDates = Object.keys(this.expensesGroupedByDate);
  }

  updateStats(data: ExpenseBasicStats) {
    this.total = data.totalForCurrentWeek.toFixed(2);
    this.count = data.countForCurrentWeek.toFixed(0);
  }

}
