import {Component, Input, OnInit} from '@angular/core';
import {Expense} from "../../../../b4-expenses/models/expenses/Expense";
import {ConfigService} from "../../../../b4-common/services/config.service";

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

  isDark: boolean = false;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getSelectedTheme()
      .subscribe(theme => {
        console.log('selected theme: ', {theme})
        this.isDark = (theme === 'dark-theme');
      })
  }

}
