import {Component, OnInit} from '@angular/core';
import {BudgetRepository} from "../../../../../repositories/budgets/budget-repository.service";
import {Budget} from "../../../../../models/expenses/Budget";
import {ExpenseBasicStats} from "../../../../../models/expenses/ExpenseBasicStats";
import {ExpenseStatsRepository} from "../../../../../repositories/expenses/expense-stats-repository.service";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget: Budget | null = null;
  expenseBasicStats: ExpenseBasicStats | null = null;

  constructor(private budgetService: BudgetRepository,
              private expenseStatsRepository: ExpenseStatsRepository, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.budgetService.getByUserId(1).subscribe(data => this.budget = data, error => {
      this.logger.error('failed to load budget information', {error})
    })

    this.expenseStatsRepository.getBasicStats().subscribe(data => {
      this.expenseBasicStats = data;
    }, error => {
      this.logger.error('failed to load budget related stats information', {error})
    })
  }


}
