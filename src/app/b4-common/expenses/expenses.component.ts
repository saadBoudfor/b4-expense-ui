import {Component, Input, OnInit, Output} from '@angular/core';
import {ExpenseRepository} from "../../b4-expenses/repositories/expenses/expense-repository.service";
import {Expense} from "../../b4-expenses/models/Expense";
import {EventEmitter} from '@angular/core';
import {ExpenseUtils} from "../util/ExpenseUtils";

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  @Input()
  expenses!: Expense[];

  @Input()
  subTitle: 'date' | 'place' = 'date';

  @Output()
  selected = new EventEmitter<Expense>();

  constructor(private expenseService: ExpenseRepository) {
  }

  ngOnInit(): void {

  }

  getPrice(expense: Expense): string {
    return ExpenseUtils.getPrice(expense);
  }
}
