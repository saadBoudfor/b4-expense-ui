import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {ExpenseInfo} from "../../models/ExpenseInfo";

@Component({
  selector: 'all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  expenses!: Expense[];
  info!: ExpenseInfo;

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.fetchExpenses(0, 0).subscribe(data => {
      this.expenses = data;
    })

    this.expenseService.getInfo().subscribe(info => this.info = info)
  }

}
