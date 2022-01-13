import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibModule} from "../lib/lib.module";
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {AngularImports} from "../angular-imports";
import {RouterModule} from "@angular/router";
import {WebcamModule} from "ngx-webcam";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {PlaceAutocompleteComponent} from './place-autocomplete/place-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BudgetTargetDisplayerComponent} from './budget-target-displayer/budget-target-displayer.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {ExpenseCardComponent} from './expense-card/expense-card.component';
import {BarChartItemComponent} from './bar-chart-item/bar-chart-item.component';
import {BarChartExpenseComponent} from './bar-chart-expense/bar-chart-expense.component';
import {ExpensesLinesListComponent} from './expenses-lines-list/expenses-lines-list.component';
import { DatePipe } from './pipes/date/date.pipe';

@NgModule({
  declarations: [
    ConfirmationComponent,
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    ExpensesComponent,
    ExpenseCardComponent,
    BarChartItemComponent,
    BarChartExpenseComponent,
    ExpensesLinesListComponent,
    DatePipe
  ],
  exports: [
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    ExpensesComponent,
    ExpenseCardComponent,
    BarChartExpenseComponent,
    ExpensesLinesListComponent,
    DatePipe

  ],
  imports: [
    CommonModule,
    AngularImports,
    LibModule,
    RouterModule,
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
    ReactiveFormsModule
  ]
})
export class B4CommonModule {
}
