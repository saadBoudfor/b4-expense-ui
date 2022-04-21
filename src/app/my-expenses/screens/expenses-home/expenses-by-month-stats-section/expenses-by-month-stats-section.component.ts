import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExpenseBasicStats} from "../../../../b4-expenses/models/expenses/ExpenseBasicStats";
import {ExpenseRepository} from "../../../repositories/expense-repository.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'expenses-by-month-stats-section',
  templateUrl: './expenses-by-month-stats-section.component.html',
  styleUrls: ['./expenses-by-month-stats-section.component.scss']
})
export class ExpensesByMonthStatsSectionComponent implements OnInit, OnDestroy {

  @Input()
  expenseBasicStats!: ExpenseBasicStats;
  private $rq!: Subscription;

  constructor(private expenseRepository: ExpenseRepository) {
  }

  ngOnInit(): void {
    this.$rq = this.expenseRepository.getStats()
      .subscribe(data => this.expenseBasicStats = data)
  }

  ngOnDestroy(): void {
    if (!!this.$rq)
      this.$rq.unsubscribe();
  }

}
