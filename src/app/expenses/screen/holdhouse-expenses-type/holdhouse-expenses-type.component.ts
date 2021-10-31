import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'holdhouse-expenses-type',
  templateUrl: './holdhouse-expenses-type.component.html',
  styleUrls: ['./holdhouse-expenses-type.component.scss']
})
export class HoldhouseExpensesTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clearDraftExpense() {
    localStorage.removeItem('draft_expense_file');
    localStorage.removeItem('draft_expense');
  }
}
