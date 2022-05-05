import {Component, OnInit} from '@angular/core';
import {Place} from "../../../b4-common/models/Place";
import {ExpenseService} from "../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {ExpenseLine} from "../../models/ExpenseLine";
import {Expense} from "../../models/Expense";
import {Product} from "../../../b4-common/models/Product";

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
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.expense.expenseLines.push(new ExpenseLine());
    this.expenseService.clear();
  }

  uploadBill(file: any) {
    this.expenseService.updateBill(file);
  }

  onSelectPlace(selectedPlace: Place) {
    this.expense.place = selectedPlace;
  }

  onScanProduct(product: Product) {
    this.productName = product.name;
    this.isScanningProduct = false;
  }

  onSelectProduct(product: any) {
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
      })
  }

}

const logId = '[AddHouseholdExpenseUnitComponent] ';
