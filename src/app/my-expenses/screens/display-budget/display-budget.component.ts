import { Component, OnInit } from '@angular/core';
import {ExpenseRepository} from "../../repositories/expense-repository.service";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";

@Component({
  selector: 'display-budget',
  templateUrl: './display-budget.component.html',
  styleUrls: ['./display-budget.component.scss']
})
export class DisplayBudgetComponent implements OnInit {
  state!: ExpenseBasicStats;

  constructor(private expenseRepository: ExpenseRepository) { }

  ngOnInit(): void {
    this.expenseRepository.getStats().subscribe(state => this.state = state)
  }

}
