import {Injectable} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {Expense} from "../../models/expenses/Expense";
import {StringUtils} from "../../../b4-common/util/StringUtils";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private ngxLogger: NGXLogger) {
  }

  updateDraftExpense(expense: Expense, bill: any): void {
    console.log('[expense state]: ', {expense});
    localStorage.setItem('draft_expense', JSON.stringify(expense));
    localStorage.setItem('draft_expense_file', JSON.stringify(bill));
  }

  getDraftExpense(): { expense: Expense, bill: any } {
    const savedExpense = localStorage.getItem('draft_expense');
    const savedBill = localStorage.getItem('draft_expense_file');
    console.log('[expense state]: ', {savedExpense});
    return {
      expense: !!savedExpense ? JSON.parse(savedExpense) : new Expense(),
      bill: !!savedBill ? JSON.parse(savedBill) : null
    };
  }

  isExpenseValid(expense: Expense): boolean {
    if (expense && expense.place && expense.place.type === 'RESTAURANT') {
      return isRestaurantExpenseValid(expense);
    }
    return isRestaurantExpenseValid(expense)
      && !!expense.expenseLines[0].product;
  }


}

function isRestaurantExpenseValid(expense: Expense): boolean {
  return !!expense
    && StringUtils.isNotEmpty(expense.name)
    && expense.expenseLines.length !== 0
    && !!expense.expenseLines[0].quantity
    && !!expense.place;
}
