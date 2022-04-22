import {Pipe, PipeTransform} from '@angular/core';
import {Expense} from "../../b4-expenses/models/expenses/Expense";

@Pipe({
  name: 'expensePrice'
})
export class ExpensePricePipe implements PipeTransform {

  transform(expense: Expense | undefined | null): string {
    if (expense && expense.expenseLines) {
      let price = 0;
      expense?.expenseLines.forEach(item => {
        if (item && item.price)
          price += item.price;
      })
      return price + ' €';
    }
    return '';
  }

}
