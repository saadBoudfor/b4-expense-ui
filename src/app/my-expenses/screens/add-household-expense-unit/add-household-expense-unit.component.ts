import {Component, OnInit} from '@angular/core';
import {Place} from "../../../b4-common/models/Place";
import {ExpenseService} from "../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {ExpenseLine} from "../../models/ExpenseLine";
import {Expense} from "../../models/Expense";
import {Product} from "../../../b4-common/models/Product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'add-household-expense-unit',
  templateUrl: './add-household-expense-unit.component.html',
  styleUrls: ['./add-household-expense-unit.component.scss']
})
export class AddHouseholdExpenseUnitComponent implements OnInit {

  maxDate = (new Date().toISOString()).split('T')[0];
  bill: File | any;
  expense = new Expense();

  isFilteringProduct: boolean = false;
  isScanningProduct: boolean = false;
  productName = '';

  constructor(private expenseService: ExpenseService,
              private routerService: Router,
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load add household expense unit page');
    this.expense.expenseLines.push(new ExpenseLine());
    this.expenseService.clear();
  }

  uploadBill(file: any) {
    this.logger.info('upload expense bill');
    this.expenseService.updateBill(file);
  }

  onSelectPlace(selectedPlace: Place) {
    if (!selectedPlace.address || selectedPlace.type != 'STORE') {
      const message = 'update expense place invalid';
      this.logger.error(message);
      this.snackBar.open(message)
    } else {
      this.logger.info('update expense place');
      this.expense.place = selectedPlace;
    }
  }

  onScanProduct(product: Product) {
    this.logger.info('get product from scanner component')
    this.productName = product.name;
    this.isScanningProduct = false;
  }

  onSelectProduct(product: any) {
    this.logger.info('get product from product search component')
    this.productName = product.name;
    this.isFilteringProduct = false;
  }

  validate() {
    this.expenseService.createAndSave(this.expense)
      .subscribe(saved => {
        this.logger.info('Add new expense unit', {saved});
        this.routerService.navigate(['/expenses/home'])
          .then(redirect => {
            if (!redirect) {
              this.logger.error('failed to redirect to expenses home page');
            }
          })
      }, error => {
        const message = 'failed to submit new expense';
        this.logger.error(message, {error});
        this.snackBar.open(message);
      })
  }

}
