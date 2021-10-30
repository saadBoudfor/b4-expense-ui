import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Expense} from "../../models/Expense";
import {ExpenseService} from "../../services/expense.service";
import {Router} from "@angular/router";
import {Place} from "../../../b4-common/models/Place";

@Component({
  selector: 'new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  title = '';
  expense = new Expense();
  file: any;
  private bill: any;

  constructor(private translateService: TranslateService,
              private router: Router,
              private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.getExpense().subscribe(data => {
      this.expense = data.expense;
    })
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
    this.expenseService.setExpense(this.expense, this.bill);
    this.router.navigate(['/add-expense-line'])
  }

  onSelect(place: Place) {
    this.expense.place = place;
  }
}
