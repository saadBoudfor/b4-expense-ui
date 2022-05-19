import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenseRepository} from "../../../../../repositories/expenses/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {Subscription} from "rxjs";

@Component({
  selector: 'budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.scss']
})
export class BudgetTrackerComponent implements OnInit, OnDestroy {

  size = '100px';
  target = 0;
  current = 0;

  error = false;

  private $rq!: Subscription;

  constructor(private expenseRepository: ExpenseRepository,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.$rq = this.expenseRepository.getStats().subscribe(data => {
      this.error = false;
      this.target = data.target;
      this.current = data.count;
      this.logger.info('Load Expenses stats data success', {data})
    }, error => {
      this.error = true;
      this.logger.error('Failed to load Expenses stats data', {error});
    })
  }

  ngOnDestroy(): void {
    if (!!this.$rq)
      this.$rq.unsubscribe();
  }


}


const logId = '[BudgetTrackerComponent] ';
