import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ExpenseRepository} from "../../../repositories/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {Observable, Subscription} from "rxjs";
import {Expense} from "../../../../b4-expenses/models/expenses/Expense";

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnDestroy {

  error: boolean = false;
  $getExpensesSb!: Subscription;
  expenses!: Expense[];
  loading = false;

  @Input()
  set mode(mode: 'default' | 'last5' | 'all' | 'restaurant' | 'stores') {
    if (!mode) this.logger.error('mode input is required');
    let expenseRq = this.expenseRepository.get();
    switch (mode) {
      case 'last5':
        expenseRq = this.expenseRepository.getLast();
        break;
      case 'all':
        break;
      default:
        this.logger.warn('given mode unknown: ' + mode);
    }
    this.handleRequest(expenseRq);
  }

  private handleRequest(rq: Observable<Expense[]>) {
    this.loading = true;
    console.log('loading')
    this.$getExpensesSb = rq.subscribe(data => {
      this.error = false;
      this.expenses = data;
      this.loading = false;
      this.logger.info(logId + 'Get expenses list', {data});
    }, error => {
      this.error = true;
      this.loading = false;
      this.logger.error(logId + 'Failed to get expenses list', {error});
    })
  }

  constructor(private expenseRepository: ExpenseRepository,
              private logger: NGXLogger) {
  }

  ngOnDestroy(): void {
    if (!!this.$getExpensesSb)
      this.$getExpensesSb.unsubscribe();
  }

}

const logId = '[ExpenseListComponent] ';
