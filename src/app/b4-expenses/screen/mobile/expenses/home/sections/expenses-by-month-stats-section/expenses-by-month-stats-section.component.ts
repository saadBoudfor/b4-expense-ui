import {Component, Input, OnInit} from '@angular/core';
import {ExpenseBasicStats} from "../../../../../../models/ExpenseBasicStats";

@Component({
  selector: 'expenses-by-month-stats-section',
  templateUrl: './expenses-by-month-stats-section.component.html',
  styleUrls: ['./expenses-by-month-stats-section.component.scss']
})
export class ExpensesByMonthStatsSectionComponent implements OnInit {

  @Input()
  expenseBasicStats!: ExpenseBasicStats;

  constructor() {
  }

  ngOnInit(): void {
  }

}
