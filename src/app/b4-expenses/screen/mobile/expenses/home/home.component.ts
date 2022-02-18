import {Component, OnInit} from '@angular/core';
import {ExpenseBasicStats} from "../../../../models/expenses/ExpenseBasicStats";
import {ExpenseStatsRepository} from "../../../../repositories/expenses/expense-stats-repository.service";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expenseBasicStats!: ExpenseBasicStats;

  constructor(private expenseStatsRepository: ExpenseStatsRepository,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.expenseStatsRepository.getBasicStats().subscribe(data => {
      this.logger.info('load basic stats data: ', {data});
      this.expenseBasicStats = data;
    })
  }

}

