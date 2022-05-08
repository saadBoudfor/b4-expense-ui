import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {ExpenseLine} from "../../../models/ExpenseLine";
import {Expense} from "../../../models/Expense";
import {Product} from "../../../../my-products/models/Product";

@Component({
  selector: 'add-household-expense-ligne',
  templateUrl: './add-household-expense-ligne.component.html',
  styleUrls: ['./add-household-expense-ligne.component.scss']
})
export class AddHouseholdExpenseLigneComponent implements OnInit {

  expenseLine = new ExpenseLine();
  expense: Expense = new Expense();

  isFilteringProduct: boolean = false;
  isScanningProduct: boolean = false;
  productName = '';

  constructor(private expenseService: ExpenseService, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load add household expense line page');
    const expense = this.expenseService.getCurrentDraft();
    if (!!expense) {
      this.logger.info('load expense from cache', {expense})
      this.expense = expense;
    } else {
      this.logger.warn('load empty expense from cache');
    }
  }

  onScanProduct(product: Product) {
    this.logger.info('get product from scanner component')
    this.productName = product.name;
    this.isScanningProduct = false;
    this.expenseLine.product = product;
  }

  onSelectProduct(product: any) {
    this.logger.info('get product from search product component')
    this.productName = product.name;
    this.isFilteringProduct = false;
    this.expenseLine.product = product;
  }

  save() {
    this.logger.info('add new expense line ', {expenseLine: this.expenseLine});
    this.expense.expenseLines.push(this.expenseLine);
    this.expenseService.updateDraft(this.expense);
  }

}
