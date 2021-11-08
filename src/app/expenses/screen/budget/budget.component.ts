import {Component, OnInit} from '@angular/core';
import {BudgetService} from "../../services/budget.service";
import {Budget} from "../../models/Budget";
import {ExpenseService} from "../../services/expense.service";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget!: Budget;
  expenseBasicStats!: ExpenseBasicStats;

  constructor(private budgetService: BudgetService,
              private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.budgetService.getBudget().subscribe(data => this.budget = data)
    this.expenseService.getBasicStats().subscribe(data => {
      this.expenseBasicStats = data;
    })
  }


}
