import {Component, OnInit} from '@angular/core';
import {BudgetRepository} from "../../../../../repositories/budgets/budget-repository.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {CalendarUtils} from "../../../../../../lib/utils/CalendarUtils";

const userId = 1;

@Component({
  selector: 'define-budget',
  templateUrl: './define-budget.component.html',
  styleUrls: ['./define-budget.component.scss']
})
export class DefineBudgetComponent implements OnInit {

  target = '';
  currentMonth = CalendarUtils.getCurrentMonth();

  constructor(private router: Router,
              private budgetRepository: BudgetRepository,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.budgetRepository.getByUserId(userId).subscribe(data => {
      this.target = data.target + '';
    }, error => {
      this.logger.error('failed to load current budget for user: ' + userId, {error});
    })
  }

  update() {
    if (+this.target > 0) {
      this.budgetRepository.save(this.target, userId).subscribe(() => {
        this.router.navigate(['/b4-expenses/budget']).catch(reason => {
          this.logger.error('failed to redirect to budget page', {reason})
        })
      }, error => {
        this.logger.error('failed to update current budget');
      })
    } else {
      this.logger.error('cannot updated budget with invalid target');
    }
  }

}

