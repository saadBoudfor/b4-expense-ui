import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {ExpenseLine} from "../../../models/ExpenseLine";
import {Expense} from "../../../models/Expense";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'display-household-expense-list',
  templateUrl: './display-household-expense-list.component.html',
  styleUrls: ['./display-household-expense-list.component.scss']
})
export class DisplayHouseholdExpenseListComponent implements OnInit {

  expenseLines: ExpenseLine[] = [];
  expense: Expense = new Expense();
  productName = '';

  constructor(private expenseService: ExpenseService,
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }


  ngOnInit(): void {
    this.expense.expenseLines = [];
    this.expenseLines = this.expense.expenseLines;

    this.logger.info('load display household expense list');
    const loadedExpense = this.expenseService.getCurrentDraft();
    if (!!loadedExpense) {
      this.logger.info('load saved draft expense from cache success');
      this.expense = loadedExpense;
      this.expenseLines = this.expense.expenseLines;
    } else {
      const message = 'failed to load saved draft expense from cache';
      this.snackBar.open(message);
      this.logger.error(message);
    }
  }

  save() {
    this.logger.info('update household expense list', {expense: this.expense});
    this.expenseService.updateDraft(this.expense);
  }


}
