import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesHomeComponent} from './screens/expenses-home/expenses-home.component';
import {LibModule} from "../lib/lib.module";
import {AngularImports} from "../angular-imports";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {BudgetTrackerComponent} from './screens/expenses-home/budget-tracker/budget-tracker.component';
import {ExpenseComponent} from './screens/expenses-home/expense/expense.component';
import {ExpenseListComponent} from './screens/expenses-home/expense-list/expense-list.component';
import {ExpensePricePipe} from './pipe/expense-price.pipe';
import {ContentPlaceholderComponent} from './screens/content-placeholder/content-placeholder.component';
import {ExpensesByTypeComponent} from './screens/expenses-home/expenses-by-type/expenses-by-type.component';
import {ExpensesByScoreChartComponent} from './screens/expenses-home/expenses-by-score-chart/expenses-by-score-chart.component';
import {ExpensesByMonthStatsSectionComponent} from "./screens/expenses-home/expenses-by-month-stats-section/expenses-by-month-stats-section.component";
import {B4CommonModule} from "../b4-common/b4-common.module";
import {ExpensesActionComponent} from './screens/expenses-action/expenses-action.component';
import {AddRestaurantExpenseComponent} from './screens/add-restaurant-expense/add-restaurant-expense.component';
import {AddHouseholdExpenseListComponent} from './screens/expense-list/add-household-expense-list/add-household-expense-list.component';
import {SelectHouseholdExpenseComponent} from './screens/select-household-expense/select-household-expense.component';
import {DisplayHouseholdExpenseListComponent} from './screens/expense-list/display-household-expense-list/display-household-expense-list.component';
import {AddHouseholdExpenseLigneComponent} from './screens/expense-list/add-household-expense-ligne/add-household-expense-ligne.component';
import {ValidateHouseholdExpenseListComponent} from './screens/validate-household-expense-list/validate-household-expense-list.component';
import {AddHouseholdExpenseUnitComponent} from './screens/add-household-expense-unit/add-household-expense-unit.component';
import {SelectExpenseTypeComponent} from './screens/select-expense-type/select-expense-type.component';
import {ExpenseDetailsComponent} from './screens/expense-details/expense-details.component';
import {TopExpensesComponent} from './screens/top-expenses/top-expenses.component';
import {environment} from "../../environments/environment";
import { DisplayBudgetComponent } from './screens/display-budget/display-budget.component';
import { UpdateBudgetComponent } from './screens/update-budget/update-budget.component';
import {NutrientsStatsComponent} from "./screens/expenses-home/expenses-by-score-chart/nutrients-stats/nutrients-stats.component";
import {NgxEchartsModule} from "ngx-echarts";

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
    ExpensesActionComponent,
    AddRestaurantExpenseComponent,
    AddHouseholdExpenseListComponent,
    SelectHouseholdExpenseComponent,
    DisplayHouseholdExpenseListComponent,
    AddHouseholdExpenseLigneComponent,
    ValidateHouseholdExpenseListComponent,
    AddHouseholdExpenseUnitComponent,
    SelectExpenseTypeComponent,
    ExpenseDetailsComponent,
    TopExpensesComponent,
    DisplayBudgetComponent,
    UpdateBudgetComponent,
    NutrientsStatsComponent
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
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.DEBUG,
      enableSourceMaps: true,
      disableFileDetails: true,
      serverLoggingUrl: environment.logServer
    } as any),
    B4CommonModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ]
})
export class MyExpensesModule {
}
