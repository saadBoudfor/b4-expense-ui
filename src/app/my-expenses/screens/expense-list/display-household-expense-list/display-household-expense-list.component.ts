import {Component, OnInit} from '@angular/core';
import {ExpenseLine} from "../../../../b4-expenses/models/expenses/ExpenseLine";
import {Product} from "../../../../b4-expenses/models/expenses/Product";
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {Expense} from "../../../../b4-expenses/models/expenses/Expense";

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
              private logger: NGXLogger) {
  }


  ngOnInit(): void {
    this.expense.expenseLines = [];
    this.expenseLines = this.expense.expenseLines;

    this.logger.info('load component');
    const loadedExpense = this.expenseService.getCurrentDraft();
    if (!!loadedExpense) {
      this.expense = loadedExpense;
      this.expenseLines = this.expense.expenseLines;
    }
  }

  save() {
    this.expenseService.updateDraft(this.expense);
  }


}

const logId = '[DisplayHouseholdExpenseListComponent] ';