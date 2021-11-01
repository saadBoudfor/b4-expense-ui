import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {ExpenseLine} from "../../expenses/models/ExpenseLine";

@Component({
  selector: 'expenses-lines-list',
  templateUrl: './expenses-lines-list.component.html',
  styleUrls: ['./expenses-lines-list.component.scss']
})
export class ExpensesLinesListComponent implements OnInit {

  @Input()
  expenseLines: ExpenseLine[] = []

  @Output()
  deleted = new EventEmitter<ExpenseLine>();

  constructor() {
  }

  ngOnInit(): void {
  }


}
