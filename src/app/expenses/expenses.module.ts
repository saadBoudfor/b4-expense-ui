import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularImports} from "../angular-imports";
import {LibModule} from "../lib/lib.module";
import { NewProductComponent } from './screen/new-product/new-product.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {FormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";
import { NewExpenseUnitComponent } from './screen/new-expense-unit/new-expense-unit.component';
import { SearchProductComponent } from './screen/search-product/search-product.component';
import {B4CommonModule} from "../b4-common/b4-common.module";
import { NewExpenseComponent } from './screen/new-expense/new-expense.component';
import { AddExpenseLineComponent } from './screen/new-expense/add-expense-line/add-expense-line.component';
import { ExpenseLinesComponent } from './screen/new-expense/expense-lines/expense-lines.component';
import {RouterModule} from "@angular/router";
import { ExpensesTypeComponent } from './screen/expenses-type/expenses-type.component';
import { HoldhouseExpensesTypeComponent } from './screen/holdhouse-expenses-type/holdhouse-expenses-type.component';
import { HomeComponent } from './screen/home/home.component';
import { AddActionComponent } from './screen/add-action/add-action.component';
import { AllExpensesComponent } from './screen/all-expenses/all-expenses.component';
import { ExpensesByPlaceComponent } from './screen/expenses-by-place/expenses-by-place.component';
import { ExpenseDetailsComponent } from './screen/expense-details/expense-details.component';
import { BudgetComponent } from './screen/budget/budget.component';
import { DefineBudgetComponent } from './screen/define-budget/define-budget.component';

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
    DefineBudgetComponent
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
        RouterModule
    ]
})
export class ExpensesModule { }
