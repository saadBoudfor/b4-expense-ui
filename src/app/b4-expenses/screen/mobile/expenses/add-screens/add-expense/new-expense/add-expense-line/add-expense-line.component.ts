import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../../../models/expenses/Product";
import {TranslateService} from "@ngx-translate/core";
import {ExpenseLine} from "../../../../../../../models/expenses/ExpenseLine";
import {ExpenseRepository} from "../../../../../../../repositories/expenses/expense-repository.service";
import {Expense} from "../../../../../../../models/expenses/Expense";
import {Router} from "@angular/router";
import {ProductService} from "../../../../../../../services/product.service";
import {ExpenseService} from "../../../../../../../services/expenses/expense.service";

@Component({
  selector: 'add-expense-line',
  templateUrl: './add-expense-line.component.html',
  styleUrls: ['./add-expense-line.component.scss']
})
export class AddExpenseLineComponent implements OnInit {

  selectingProduct = false;
  title = '';
  expenseLine = new ExpenseLine();

  expense: Expense = new Expense();
  scanCode: boolean = false;

  constructor(private translateService: TranslateService,
              private router: Router,
              private expenseService: ExpenseService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.expense = this.expenseService.getDraftExpense().expense;
    this.translateService.get('screen.new.expense.title')
      .subscribe(title => this.title = title);
  }

  onSelectProduct(product: Product) {
    this.selectingProduct = false;
    this.expenseLine.product = product;
  }

  addExpenseLine() {
    this.expense?.expenseLines.push(this.expenseLine);
    this.expenseService.updateDraftExpense(this.expense, null);
    this.router.navigate(['/expense-line-list'])
  }

  onScanCode(code: string) {
    this.scanCode = false;
    this.productService.getByCode(code).subscribe(found => {
      this.expenseLine.product = found;
    })
  }

  canAddExpenseLine() {
    return !!this.expense && !!this.expenseLine.product && !!this.expenseLine.quantity;
  }
}
