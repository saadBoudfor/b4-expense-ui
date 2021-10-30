import {Component, Input, OnInit} from '@angular/core';
import {Expense} from "../../expenses/models/Expense";
import {ExpenseLine} from "../../expenses/models/ExpenseLine";
import {Product} from "../../expenses/models/Product";

@Component({
  selector: 'expenses-lines-list',
  templateUrl: './expenses-lines-list.component.html',
  styleUrls: ['./expenses-lines-list.component.scss']
})
export class ExpensesLinesListComponent implements OnInit {

  @Input()
  expenseLines: ExpenseLine[] = []

  iconPath = '/assets/products/';

  constructor() {
  }

  ngOnInit(): void {
  }

  getIcon(category: String) {
    switch (category) {
      default:
      case 'VEGETABLE':
        return this.iconPath + 'vegetable.svg';
      case 'MEAT':
        return this.iconPath + 'meat.svg';
      case 'DRINK':
        return this.iconPath + 'drink.svg';
    }
  }

}
