import { Component, OnInit } from '@angular/core';
import {ExpenseRepository} from "../../../../repositories/expenses/expense-repository.service";
import {ExpenseBasicStats} from "../../../../data-model/expenses/ExpenseBasicStats";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'display-budget',
  templateUrl: './display-budget.component.html',
  styleUrls: ['./display-budget.component.scss']
})
export class DisplayBudgetComponent implements OnInit {
  state!: ExpenseBasicStats;

  constructor(private expenseRepository: ExpenseRepository,
              private logger:NGXLogger) { }

  ngOnInit(): void {
    this.logger.info('load display budge page');
    this.expenseRepository.getStats().subscribe(state => this.state = state)
  }

}
