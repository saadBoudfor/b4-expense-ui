import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input()
  expensesCount = '0';

  @Input()
  totalExpenses = '0';

  @Input()
  percentage = '0';

  @Input()
  type: 'STORE' | 'RESTAURANT' = 'STORE';


  constructor() {
  }

  ngOnInit(): void {
  }

}
