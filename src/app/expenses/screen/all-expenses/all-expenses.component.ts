import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {ExpenseInfo} from "../../models/ExpenseInfo";
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import {Router} from "@angular/router";

@Component({
  selector: 'all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  expenses!: Expense[];
  groupedExpenses!: Dictionary<[Expense, ...Expense[]]>;
  info!: ExpenseInfo;
  expenseDates!: string[];

  constructor(private expenseService: ExpenseService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.expenseService.fetchExpenses(0, 0).subscribe(data => {
      this.expenses = data;
      this.groupedExpenses = _.groupBy<Expense>(data, 'date') ;
      this.expenseDates = Object.keys(this.groupedExpenses);
    })

    this.expenseService.getInfo().subscribe(info => this.info = info)
  }

  onSelectExpense($event: Expense) {
    this.router.navigate(['/expense-details'], {queryParams: {id: $event.id}});
  }
}
