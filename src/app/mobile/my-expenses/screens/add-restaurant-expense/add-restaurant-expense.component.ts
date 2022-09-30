import {Component, OnInit} from '@angular/core';
import {Place} from "../../../../data-model/address/Place";
import {ExpenseService} from "../../../../services/expenses/expense.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {Expense} from "../../../../data-model/expenses/Expense";
import {ExpenseLine} from "../../../../data-model/expenses/ExpenseLine";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'add-restaurant-expense',
  templateUrl: './add-restaurant-expense.component.html',
  styleUrls: ['./add-restaurant-expense.component.scss']
})
export class AddRestaurantExpenseComponent implements OnInit {
  maxDate = (new Date().toISOString()).split('T')[0];
  bill: File | any;
  expense = new Expense();

  constructor(private expenseService: ExpenseService,
              private routerService: Router,
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load add restaurant expense page');
    this.expense.expenseLines.push(new ExpenseLine());
    this.expenseService.clear();
  }

  uploadBill(file: any) {
    this.logger.info('upload expense bill');
    this.expenseService.updateBill(file);
  }

  onSelectPlace(selectedPlace: Place | string) {
    if (!selectedPlace || (typeof selectedPlace === 'string')) return;
    if (!selectedPlace.address || selectedPlace.type != 'RESTAURANT') {
      const message = 'update expense place invalid';
      this.logger.error(message);
      this.snackBar.open(message)
    } else {
      this.logger.info('update expense place');
      this.expense.place = selectedPlace;
    }
  }

  validate() {
    this.expenseService.createAndSave(this.expense)
      .subscribe(saved => {
        this.logger.info('Add new restaurant expense', {saved});
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