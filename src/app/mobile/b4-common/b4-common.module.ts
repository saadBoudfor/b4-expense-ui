import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibModule} from "../../lib/lib.module";
import {AngularImports} from "../../angular-imports";
import {RouterModule} from "@angular/router";
import {WebcamModule} from "ngx-webcam";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";
import {HttpClient} from "@angular/common/http";
import {PlaceAutocompleteComponent} from './components/place-autocomplete/place-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BudgetTargetDisplayerComponent} from './components/chart-expenses/budget-target-displayer/budget-target-displayer.component';
import {BarChartItemComponent} from './components/chart-expenses/bar-chart-item/bar-chart-item.component';
import {BarChartExpenseComponent} from './components/chart-expenses/bar-chart-expense/bar-chart-expense.component';
import { DatePipe } from './pipes/date/date.pipe';
import { MobileLateralMenuComponent } from './components/mobile-lateral-menu/mobile-lateral-menu.component';
import { SettingsComponent } from './screens/settings/settings.component';

@NgModule({
  declarations: [
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    BarChartItemComponent,
    BarChartExpenseComponent,
    DatePipe,
    MobileLateralMenuComponent,
    SettingsComponent,
  ],
  exports: [
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    BarChartExpenseComponent,
    DatePipe,
    MobileLateralMenuComponent,
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
