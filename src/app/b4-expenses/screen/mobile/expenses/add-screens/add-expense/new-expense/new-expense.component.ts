import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Expense} from "../../../../../../models/Expense";
import {ExpenseRepository} from "../../../../../../repositories/expenses/expense-repository.service";
import {Router} from "@angular/router";
import {Place} from "../../../../../../../b4-common/models/Place";
import {StringUtils} from "../../../../../../../b4-common/util/StringUtils";
import {ExpenseService} from "../../../../../../services/expenses/expense.service";

@Component({
  selector: 'new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  title = '';
  expense = new Expense();
  file: any;
  maxDate = (new Date().toISOString()).split('T')[0];

  private bill: any;

  constructor(private translateService: TranslateService,
              private router: Router,
              private expenseService: ExpenseService,
              private expenseRepository: ExpenseRepository) {
  }

  ngOnInit(): void {
    const data = this.expenseService.getDraftExpense();
    this.expense = data.expense;
    this.bill = data.bill;
    this.translateService.get('screen.new.expense.title')
      .subscribe(title => this.title = title);
  }

  onUploadBill(uploadedFile: any) {
    this.bill = uploadedFile;
  }

  addExpenseLine() {
    this.expense.author = {
      id: 1,
      name: "saad",
      lastname: "boudfor",
      email: "saad.boudfor@b4expenses.com",
      username: "sboudfor"
    };
    this.expense.user = {
      id: 1,
      name: "saad",
      lastname: "boudfor",
      email: "saad.boudfor@b4expenses.com",
      username: "sboudfor"
    };
    this.expenseService.updateDraftExpense(this.expense, this.bill);
    this.router.navigate(['/add-expense-line'])
  }

  onSelect(place: Place) {
    this.expense.place = place;
  }

  canAddExpenseLine() {
    return StringUtils.isNotEmpty(this.expense.name) && !!this.expense.place && !!this.expense.place.type;
  }
}
