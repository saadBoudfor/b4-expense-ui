import {Component, OnInit, Sanitizer} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../../b4-expenses/models/expenses/Expense";
import {Address} from "../../../b4-common/models/Address";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'validate-household-expense-list',
  templateUrl: './validate-household-expense-list.component.html',
  styleUrls: ['./validate-household-expense-list.component.scss']
})
export class ValidateHouseholdExpenseListComponent implements OnInit {
  expense!: Expense;
  total: number = 0;
  googleMapUrl!: SafeResourceUrl;

  constructor(private expenseService: ExpenseService,
              private sanitizer: DomSanitizer,
              private routerService: Router,
              private logger: NGXLogger) {
  }


  ngOnInit(): void {
    this.logger.info('load component');
    const draftExpense = this.expenseService.getCurrentDraft();
    if (!!draftExpense) {
      this.expense = draftExpense;
      this.logger.info('load draft expense data', {draftExpense: this.expense})
      this.expense.expenseLines.forEach(ep => {
        if (ep.price && ep.quantity)
          this.total += (ep.price * ep.quantity);
      })
      const url = "https://maps.google.com/maps?q=" + convertAddress(this.expense.place.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  onValidate() {
    this.expenseService.validateExpense().subscribe(saved => this.afterExpensesValidate(saved))
  }

  private afterExpensesValidate(saved: Expense) {
    this.logger.info('Expense saved', {saved});
    this.expenseService.clear();
    this.routerService.navigate(['/expenses/home']).then(redirect => {
      if (!redirect) {
        this.logger.error('Failed to redirect to expenses home');
      }
    })
  }

}

const logId = '[ValidateHouseholdExpenseListComponent] '

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}
