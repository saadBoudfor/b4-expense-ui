import {Component, OnInit} from '@angular/core';
import {Expense} from "../../../../../../models/Expense";
import {Router} from "@angular/router";
import {ExpenseRepository} from "../../../../../../repositories/expenses/expense-repository.service";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'last-expenses-section',
  templateUrl: './last-expenses.component.html',
  styleUrls: ['./last-expenses.component.scss']
})
export class LastExpensesComponent implements OnInit {

  expenses!: Expense[];

  constructor(private expenseRepository: ExpenseRepository,
              private logger: NGXLogger,
              private router: Router) {
  }

  ngOnInit(): void {
    this.expenseRepository.fetchLastExpenses()
      .subscribe(data => this.expenses = data, error => {
        this.logger.error('failed to load last expenses', {error})
      });
  }

  onClick(expense: Expense) {
    if (!!expense && !!expense.id) {
      this.router.navigate(['/expense-details'], {queryParams: {id: expense.id}})
        .catch(reason => {
          this.logger.error('failed to redirect to "/expense-details" page', {reason});
        })
    } else {
      this.logger.error('cannot select empty expense (or with empty id)');
    }
  }

}
