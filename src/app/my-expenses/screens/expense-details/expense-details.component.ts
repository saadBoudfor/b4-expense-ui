import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Expense} from "../../../b4-expenses/models/expenses/Expense";
import {ExpenseService} from "../../services/expense.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Address} from "../../../b4-common/models/Address";

@Component({
  selector: 'expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  @Input()
  backURL = '';

  expense!: Expense;

  total = 0;
  googleMapUrl: any;

  constructor(private activeRouter: ActivatedRoute,
              private expenseService: ExpenseService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const expenseId = this.activeRouter.snapshot.queryParams['id'];
    this.backURL = this.activeRouter.snapshot.queryParams['backURL'];
    this.expenseService.getExpenseById(expenseId).subscribe(expense => {
      this.expense = expense;
      this.expense.expenseLines.forEach(ep => {
        if (ep.price && ep.quantity)
          this.total += (ep.price * ep.quantity);
      })
      const url = "https://maps.google.com/maps?q=" + convertAddress(this.expense.place.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }
}
function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}
