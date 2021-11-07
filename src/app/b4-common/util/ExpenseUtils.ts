import {Expense} from "../../expenses/models/Expense";

export class ExpenseUtils {
  public static getPrice(expense: Expense): string {
    let total = 0;
    expense.expenseLines.forEach(expenseLine => total += expenseLine.price ? expenseLine.price : 0);
    return total.toFixed(2);
  }
}
