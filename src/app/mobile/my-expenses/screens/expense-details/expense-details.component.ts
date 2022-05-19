import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExpenseService} from "../../../../services/expenses/expense.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Address} from "../../../../data-model/address/Address";
import {Expense} from "../../../../data-model/expenses/Expense";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NGXLogger} from "ngx-logger";
import {Product} from "../../../../data-model/products/Product";
import {ExpenseLine} from "../../../../data-model/expenses/ExpenseLine";

@Component({
  selector: 'expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  @Input()
  backURL = '';

  expense!: Expense;

  total = 0;
  googleMapUrl: any;
  displayingProduct = false;
  selectedProduct!: Product;

  constructor(private activeRouter: ActivatedRoute,
              private expenseService: ExpenseService,
              private logger: NGXLogger,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.logger.info('load expense details page');
    const expenseId = this.activeRouter.snapshot.queryParams['id'];

    if (!expenseId) {
      this.logger.error('cannot get expense details with invalid id');
      this.snackBar.open('invalid url: cannot request expense details');
      return;
    }
    this.backURL = this.activeRouter.snapshot.queryParams['backURL'];
    this.expenseService.getExpenseById(expenseId).subscribe(expense => {
      this.logger.info('load expense ' + expenseId + ' details success', {expense})
      this.expense = expense;
      this.total = getExpenseTotalPrice(expense);
      const url = getGoogleMapsUrl(expense);
      this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }, error => {
      this.logger.error('failed to get expense ' + expenseId + ' details', {error});
      this.snackBar.open('technical error. Please contact your admin');
    })
  }

  onDisplayProductDetails(ep: ExpenseLine) {
    if (!!ep && !!ep.product) {
      this.selectedProduct = ep.product
      this.displayingProduct = true;
    }
  }
}

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}

function getGoogleMapsUrl(expense: Expense) {
  return "https://maps.google.com/maps?q="
    + convertAddress(expense.place.address)
    + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
}

function getExpenseTotalPrice(expense: Expense) {
  let total = 0;
  expense.expenseLines.forEach(ep => {
    if (ep.price && ep.quantity)
      total += (ep.price * ep.quantity);
  })
  return total;
}
