import {Expense} from "../../my-expenses/models/Expense";

export class ExpenseUtils {
  public static getPrice(expense: Expense): string {
    if(!expense || !expense.expenseLines || expense.expenseLines.length != 0) {
      return '';
    }
    let total = 0;
    expense.expenseLines.forEach(expenseLine => total += expenseLine.price ? expenseLine.price : 0);
    return total.toFixed(2);
  }
}
