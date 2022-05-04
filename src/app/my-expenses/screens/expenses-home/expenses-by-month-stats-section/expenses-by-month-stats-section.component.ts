import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExpenseBasicStats} from "../../../../b4-expenses/models/expenses/ExpenseBasicStats";
import {ExpenseRepository} from "../../../repositories/expense-repository.service";
import {Subscription} from "rxjs";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'expenses-by-month-stats-section',
  templateUrl: './expenses-by-month-stats-section.component.html',
  styleUrls: ['./expenses-by-month-stats-section.component.scss']
})
export class ExpensesByMonthStatsSectionComponent implements OnInit, OnDestroy {

  @Input()
  expenseBasicStats!: ExpenseBasicStats;
  error = false;
  private $rq!: Subscription;

  constructor(private expenseRepository: ExpenseRepository,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.$rq = this.expenseRepository.getStats()
      .subscribe(data => {
        this.expenseBasicStats = data;
        this.logger.info('Load expenses chart data: expenses by month', {data});
        this.error = false;
      }, reason => {
        this.logger.error('failed to load chart (expenses by month) data', {reason})
        this.error = true;
      })
  }

  ngOnDestroy(): void {
    if (!!this.$rq)
      this.$rq.unsubscribe();
  }

}

const logId = '[ExpensesByMonthStatsSectionComponent] ';
