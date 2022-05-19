import {Component, OnInit} from '@angular/core';
import {ExpenseRepository} from "../../../../repositories/expenses/expense-repository.service";
import {BudgetRepositoryService} from "../../../../repositories/expenses/budget-repository.service";
import {Router} from "@angular/router";
import {ExpenseBasicStats} from "../../../../data-model/expenses/ExpenseBasicStats";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'update-budget',
  templateUrl: './update-budget.component.html',
  styleUrls: ['./update-budget.component.scss']
})
export class UpdateBudgetComponent implements OnInit {
  state!: ExpenseBasicStats;
  newTarget!: number;

  constructor(private expenseRepository: ExpenseRepository,
              private logger: NGXLogger,
              private router: Router,
              private budgetRepository: BudgetRepositoryService) {
  }

  ngOnInit(): void {
    this.logger.info('load update budget page');
    this.expenseRepository.getStats().subscribe(state => this.state = state)
  }

  validate() {
    this.budgetRepository.updateBudget(this.newTarget).subscribe(saved => {
      this.router.navigate(['/expenses/home']);
    })
  }
}
