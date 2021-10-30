import {Component, Input, OnInit, Output} from '@angular/core';
import {ExpenseService} from "../../expenses/services/expense.service";
import {Expense} from "../../expenses/models/Expense";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  @Input()
  expenses!: Expense[];

  @Output()
  selected = new EventEmitter<Expense>();

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {

  }

  getPrice(expense: Expense): number {
    let total = 0;
    expense.expenseLines.forEach(expenseLine => total += expenseLine.price ? expenseLine.price : 0);
    return total;
  }
}
