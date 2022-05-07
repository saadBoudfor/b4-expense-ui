import {Component, Input, OnDestroy} from '@angular/core';
import {ExpenseRepository} from "../../../repositories/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {Observable, Subscription} from "rxjs";
import {Expense} from "../../../models/Expense";

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
  backURL!: string;

  @Input()
  set mode(value: ExpenseListMode) {
    if (!value.mode) this.logger.error('mode input is required');
    let expenseRq = this.expenseRepository.get();
    switch (value.mode) {
      case 'last5':
        expenseRq = this.expenseRepository.getLast();
        break;
      case 'all':
        break;
      case 'restaurant':
        if (value.arguments.id) {
          expenseRq = this.expenseRepository.getExpensesByPlaceId(value.arguments.id)
        }
        break;
      default:
        this.logger.warn('given mode unknown: ' + value.mode);
    }
    this.handleRequest(expenseRq);
  }

  private handleRequest(rq: Observable<Expense[]>) {
    this.loading = true;
    this.$getExpensesSb = rq.subscribe(data => {
      this.error = false;
      this.expenses = data;
      this.loading = false;
      this.logger.info('Get expenses list', {data});
    }, error => {
      this.error = true;
      this.loading = false;
      this.logger.error('Failed to get expenses list', {error});
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

class ExpenseListMode {
  mode: 'default' | 'last5' | 'all' | 'restaurant' | 'stores' = 'default';
  arguments?: any;
}
