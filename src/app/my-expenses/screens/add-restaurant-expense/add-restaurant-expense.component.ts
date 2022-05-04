import { Component, OnInit } from '@angular/core';
import {Expense} from "../../../b4-expenses/models/expenses/Expense";
import {Place} from "../../../b4-common/models/Place";
import {ExpenseLine} from "../../../b4-expenses/models/expenses/ExpenseLine";
import {ExpenseService} from "../../services/expense.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";

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
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.expense.expenseLines.push(new ExpenseLine());
  }

  uploadBill(file: any) {
    this.expenseService.updateBill(file);
  }

  onSelectPlace(selectedPlace: Place) {
    this.expense.place = selectedPlace;
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
      })
  }
}

const logId = '[AddRestaurantExpenseComponent] ';
