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

  onBillUpload(bill: any) {
    if (this.expense && this.expense.id)
      this.expenseService.addBill(this.expense.id, bill).subscribe(updated => {
        this.expense = updated;
      })
  }

  download(url: string, filename: string) {
    forceDown(url, filename);
  }
}

function getPrice(expense: Expense) {
  let total = 0;
  expense.expenseLines.forEach(expense => total += expense.price ? expense.price : 0)
  return total;
}

function forceDown(url: string, filename: string) {
  fetch(url).then(function (t) {
    return t.blob().then((b) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.setAttribute("download", filename);
      a.click();
    });
  });
}
