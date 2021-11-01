import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Expense} from "../../models/Expense";
import {environment} from "../../../../environments/environment";
import {Location} from "@angular/common";

@Component({
  selector: 'expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
  expense!: Expense;
  photoBaseURl: string = environment.fileServerURL + '/expenses/';
  price: number = 0;

  constructor(private expenseService: ExpenseService,
              public location: Location,
              private router: Router,
              private activatedRouteService: ActivatedRoute) {
  }

  ngOnInit(): void {
    const queryParams = this.activatedRouteService.snapshot.queryParams;
    this.expenseService.getExpenseByID(queryParams.id).subscribe(data => {
      this.expense = data;
      this.price = getPrice(this.expense);
    })
  }

  delete() {
    this.expenseService.delete(this.expense.id).subscribe(() => {
      console.warn('expense deleted', {expense: this.expense})
      this.router.navigate(['/expenses'])
    })
  }
}

function getPrice(expense: Expense) {
  let total = 0;
  expense.expenseLines.forEach(expense => total += expense.price ? expense.price : 0)
  return total;
}
