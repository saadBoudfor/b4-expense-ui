import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {ExpenseLine} from "../../../models/ExpenseLine";
import {Expense} from "../../../models/Expense";
import {Product} from "../../../../b4-common/models/Product";

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
    this.logger.info('load component');
    const loadedExpense = this.expenseService.getCurrentDraft();
    if (!!loadedExpense) {
      this.expense = loadedExpense;
    }
  }

  onScanProduct(product: Product) {
    this.productName = product.name;
    this.isScanningProduct = false;
    this.expenseLine.product = product;
  }

  onSelectProduct(product: any) {
    this.productName = product.name;
    this.isFilteringProduct = false;
    this.expenseLine.product = product;
  }

  save() {
    this.expense.expenseLines.push(this.expenseLine);
    this.expenseService.updateDraft(this.expense);
  }

}

const logId = '[AddHouseholdExpenseLigneComponent] ';
