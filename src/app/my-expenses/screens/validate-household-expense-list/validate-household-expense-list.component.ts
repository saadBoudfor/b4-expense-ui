import {Component, OnInit} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../services/expense.service";
import {Address} from "../../../b4-common/models/Address";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Expense} from "../../models/Expense";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('load validate household expense list page');
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
    } else {
      const message = 'failed to load saved draft expense from cache';
      this.logger.error(message);
      this.snackBar.open(message);
    }
  }

  onValidate() {
    this.expenseService.validateExpense().subscribe(saved => {
      this.logger.info('Expense saved', {saved});
      this.expenseService.clear();
      this.routerService.navigate(['/expenses/home']).then(redirect => {
        if (!redirect) {
          this.logger.error('Failed to redirect to expenses home');
        }
      }, error => {
        const message = 'Internal error: Failed to save new expense';
        this.logger.error(message, {error});
        this.snackBar.open(message);
      })
    })
  }
}

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}

