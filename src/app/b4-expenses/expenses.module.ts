import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularImports} from "../angular-imports";
import {LibModule} from "../lib/lib.module";
import {NewProductComponent} from './screen/mobile/expenses/add-screens/new-product/new-product.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {FormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";
import {NewExpenseUnitComponent} from './screen/mobile/expenses/add-screens/add-expense/new-expense-unit/new-expense-unit.component';
import {SearchProductComponent} from './screen/mobile/expenses/search-product/search-product.component';
import {B4CommonModule} from "../b4-common/b4-common.module";
import {NewExpenseComponent} from './screen/mobile/expenses/add-screens/add-expense/new-expense/new-expense.component';
import {AddExpenseLineComponent} from './screen/mobile/expenses/add-screens/add-expense/new-expense/add-expense-line/add-expense-line.component';
import {ExpenseLinesComponent} from './screen/mobile/expenses/add-screens/add-expense/new-expense/expense-lines/expense-lines.component';
import {RouterModule} from "@angular/router";
import {ExpensesTypeComponent} from './screen/mobile/expenses/add-screens/expenses-type/expenses-type.component';
import {HoldhouseExpensesTypeComponent} from './screen/mobile/expenses/add-screens/holdhouse-expenses-type/holdhouse-expenses-type.component';
import {HomeComponent} from './screen/mobile/expenses/home/home.component';
import {AddActionComponent} from './screen/mobile/expenses/add-screens/add-action/add-action.component';
import {AllExpensesComponent} from './screen/mobile/expenses/all-expenses/all-expenses.component';
import {ExpensesByPlaceComponent} from './screen/mobile/expenses/add-screens/expenses-by-place/expenses-by-place.component';
import {ExpenseDetailsComponent} from './screen/mobile/expenses/expense-details/expense-details.component';
import {BudgetComponent} from './screen/mobile/expenses/budget/display-budget/budget.component';
import {DefineBudgetComponent} from './screen/mobile/expenses/budget/define-budget/define-budget.component';
import {ProductDetailsComponent} from './screen/mobile/expenses/product-details/product-details.component';
import {ProductListComponent} from './screen/mobile/expenses/product-list/product-list.component';
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import { LastExpensesComponent } from './screen/mobile/expenses/home/sections/last-expenses-section/last-expenses.component';
import { ExpensesByTypeSummarySectionComponent } from './screen/mobile/expenses/home/sections/expenses-by-type-summary-section/expenses-by-type-summary-section.component';
import { ExpensesByNutrientsStatsSectionComponent } from './screen/mobile/expenses/home/sections/expenses-by-nutrients-stats-section/expenses-by-nutrients-stats-section.component';
import { ExpensesByMonthStatsSectionComponent } from './screen/mobile/expenses/home/sections/expenses-by-month-stats-section/expenses-by-month-stats-section.component';

@NgModule({
  declarations: [
    NewProductComponent,
    NewExpenseUnitComponent,
    SearchProductComponent,
    NewExpenseComponent,
    AddExpenseLineComponent,
    ExpenseLinesComponent,
    ExpensesTypeComponent,
    HoldhouseExpensesTypeComponent,
    HomeComponent,
    AddActionComponent,
    AllExpensesComponent,
    ExpensesByPlaceComponent,
    ExpenseDetailsComponent,
    BudgetComponent,
    DefineBudgetComponent,
    ProductDetailsComponent,
    ProductListComponent,
    LastExpensesComponent,
    ExpensesByTypeSummarySectionComponent,
    ExpensesByNutrientsStatsSectionComponent,
    ExpensesByMonthStatsSectionComponent,

  ],
  imports: [
    CommonModule,
    LibModule,
    AngularImports,
    WebcamModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    B4CommonModule,
    RouterModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ]
})
export class ExpensesModule {
}
