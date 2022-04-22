import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesHomeComponent } from './screens/expenses-home/expenses-home.component';
import {LibModule} from "../lib/lib.module";
import {AngularImports} from "../angular-imports";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import { BudgetTrackerComponent } from './screens/expenses-home/budget-tracker/budget-tracker.component';
import { ExpenseComponent } from './screens/expenses-home/expense/expense.component';
import { ExpenseListComponent } from './screens/expenses-home/expense-list/expense-list.component';
import { ExpensePricePipe } from './pipe/expense-price.pipe';
import { ContentPlaceholderComponent } from './screens/content-placeholder/content-placeholder.component';
import { ExpensesByTypeComponent } from './screens/expenses-home/expenses-by-type/expenses-by-type.component';
import { ExpensesByScoreChartComponent } from './screens/expenses-home/expenses-by-score-chart/expenses-by-score-chart.component';
import {ExpensesByMonthStatsSectionComponent} from "./screens/expenses-home/expenses-by-month-stats-section/expenses-by-month-stats-section.component";
import {B4CommonModule} from "../b4-common/b4-common.module";
import { ExpensesActionComponent } from './screens/expenses-action/expenses-action.component';

@NgModule({
  declarations: [
    ExpensesHomeComponent,
    BudgetTrackerComponent,
    ExpenseComponent,
    ExpenseListComponent,
    ExpensePricePipe,
    ContentPlaceholderComponent,
    ExpensesByTypeComponent,
    ExpensesByScoreChartComponent,
    ExpensesByMonthStatsSectionComponent,
    ExpensesActionComponent
  ],
  imports: [
    CommonModule,
    LibModule,
    AngularImports,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    RouterModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    B4CommonModule,
  ]
})
export class MyExpensesModule { }
