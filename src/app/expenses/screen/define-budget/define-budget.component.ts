import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {BudgetService} from "../../services/budget.service";
import {Router} from "@angular/router";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";

@Component({
  selector: 'define-budget',
  templateUrl: './define-budget.component.html',
  styleUrls: ['./define-budget.component.scss']
})
export class DefineBudgetComponent implements OnInit {

  expenseBasicStats!: ExpenseBasicStats;
  newTarget = '';
  currentMonth = getCurrentMonth();

  constructor(private expenseService: ExpenseService,
              private router: Router,
              private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.expenseService.getBasicStats().subscribe(data => {
      this.expenseBasicStats = data;
      this.newTarget = data.target + '';
    })
  }

  update() {
    this.budgetService.save(this.newTarget).subscribe(() => {
      this.router.navigate(['/expenses'])
    })
  }

}

const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
];

function getCurrentMonth() {
  const current = new Date();
  return monthNames[current.getMonth()] + ' ' + current.getFullYear();
}
