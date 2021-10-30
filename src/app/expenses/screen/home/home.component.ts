import {Component, OnInit} from '@angular/core';
import {ExpenseInfo} from "../../models/ExpenseInfo";
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: ExpenseInfo = new ExpenseInfo();
  expenses!: Expense[];

  percentageRestaurant = 0;
  percentageStore = 0;

  constructor(private expenseService: ExpenseService, private router: Router) {
  }

  ngOnInit(): void {
    this.expenseService.getInfo().subscribe(data => {
      this.info = data;
      this.getPercentage(data);
    });
    this.expenseService.fetchExpenses(0, 0).subscribe(data => this.expenses = data);

  }

  onExpenseClick(expense: Expense) {
    // handle expense click event
    this.router.navigate(['/expense-details'], {queryParams:  {id: expense.id}})
  }

  getPercentage(expenseInfo: ExpenseInfo) {
    if (expenseInfo) {
      const total = expenseInfo.countStore + expenseInfo.countRestaurant;
      if (total !== 0) {
        this.percentageRestaurant = Math.round(expenseInfo.countRestaurant * 100 / total);
        this.percentageStore = Math.round(expenseInfo.countStore * 100 / total);
      }
    }
  }

}

