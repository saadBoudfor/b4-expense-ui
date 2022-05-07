import {Component, OnInit} from '@angular/core';
import {Place} from "../../../../b4-common/models/Place";
import {StringUtils} from "../../../../b4-common/util/StringUtils";
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";
import {Expense} from "../../../models/Expense";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'add-household-expense-list',
  templateUrl: './add-household-expense-list.component.html',
  styleUrls: ['./add-household-expense-list.component.scss']
})
export class AddHouseholdExpenseListComponent implements OnInit {
  title = '';
  expense = new Expense();
  file: any;
  maxDate = (new Date().toISOString()).split('T')[0];

  private bill: any;
  enableAddExpense!: boolean;

  constructor(private expenseService: ExpenseService,
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load add household list page');
    this.expenseService.clear();
    this.enableAddExpense = StringUtils.isNotEmpty(this.expense.name)
      && !!this.expense.place && !!this.expense.place.type;
  }

  onUploadBill(file: any) {
    this.logger.info('upload bill for household expense list');
    this.bill = file;
    this.expenseService.updateBill(file);
  }

  onSelect(selectedPlace: Place) {
    if (!selectedPlace.address || selectedPlace.type != 'RESTAURANT') {
      const message = 'update expense place invalid';
      this.logger.error(message);
      this.snackBar.open(message)
    } else {
      this.logger.info('update expense place');
      this.expense.place = selectedPlace;
    }
  }

  save() {
    this.logger.info('create expense list', {expense: this.expense});
    this.expenseService.createNewDraft(this.expense);
  }
}

