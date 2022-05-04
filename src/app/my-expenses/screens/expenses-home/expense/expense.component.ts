import {Component, Input, OnInit} from '@angular/core';
import {Expense} from "../../../../b4-expenses/models/expenses/Expense";
import {ConfigService} from "../../../../b4-common/services/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @Input()
  value!: Expense;

  @Input()
  placeholder = false;

  @Input()
  backURL!: string;

  isDark: boolean = false;

  constructor(private configService: ConfigService, private router: Router) {
  }

  ngOnInit(): void {
    this.configService.getSelectedTheme()
      .subscribe(theme => {
        this.isDark = (theme === 'dark-theme');
      })
  }

  openDetails(expense: Expense) {
    this.router.navigate(['/expenses/details'], {queryParams: {id: expense.id, backURL: this.backURL}})
  }

}
