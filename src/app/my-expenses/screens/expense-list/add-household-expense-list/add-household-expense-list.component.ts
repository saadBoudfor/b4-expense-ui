import {Component, OnInit} from '@angular/core';
import {Expense} from "../../../../b4-expenses/models/expenses/Expense";
import {Place} from "../../../../b4-common/models/Place";
import {StringUtils} from "../../../../b4-common/util/StringUtils";
import {ExpenseService} from "../../../services/expense.service";
import {NGXLogger} from "ngx-logger";

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

  constructor(private expenseService: ExpenseService, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load component');
    this.expenseService.clear();
  }

  onUploadBill(uploadedFile: any) {
    this.bill = uploadedFile;
    this.expenseService.updateBill(uploadedFile);
  }

  onSelect(place: Place) {
    this.expense.place = place;
  }

  canAddExpenseLine() {
    return StringUtils.isNotEmpty(this.expense.name)
      && !!this.expense.place && !!this.expense.place.type;
  }

  save() {
    this.expenseService.createNewDraft(this.expense);
  }
}


const logId = '[AddHouseholdExpenseListComponent] ';
