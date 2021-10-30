import {Component, OnInit} from '@angular/core';
import {BudgetService} from "../../services/budget.service";
import {Budget} from "../../models/Budget";
import {ExpenseService} from "../../services/expense.service";
import {ExpenseInfo} from "../../models/ExpenseInfo";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget!: Budget;
  info!: ExpenseInfo;

  constructor(private budgetService: BudgetService,
              private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.budgetService.getBudget().subscribe(data => this.budget = data)
    this.expenseService.getInfo().subscribe(data => {
      this.info = data;
    })
  }


}
