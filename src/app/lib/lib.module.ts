import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularImports} from "../angular-imports";
import {TranslateModule} from "@ngx-translate/core";
import {NavigationComponent} from './navigation/navigation.component';
import {ProgressComponent} from './progress/progress.component';
import {PhotoUploaderComponent} from './photo-uploader/photo-uploader.component';
import {RoundedIconComponent} from './rounded-icon/rounded-icon.component';
import {ChoiceComponent} from './choice/choice.component';
import {RouterModule} from "@angular/router";
import {MoreInfoComponent} from './more-info/more-info.component';
import {BarcodeScannerComponent} from "./barcode-scanner/barcode-scanner.component";
import {FormsModule} from "@angular/forms";
import {NutrientsStatsComponent} from './nutrients-stats/nutrients-stats.component';
import {NgxEchartsModule} from "ngx-echarts";
import { ActionContainerComponent } from './action-container/action-container.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ProgressComponent,
    PhotoUploaderComponent,
    RoundedIconComponent,
    ChoiceComponent,
    BarcodeScannerComponent,
    MoreInfoComponent,
    NutrientsStatsComponent,
    ActionContainerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularImports,
    RouterModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  exports: [NutrientsStatsComponent, NavigationComponent, MoreInfoComponent, ProgressComponent, PhotoUploaderComponent, RoundedIconComponent, ChoiceComponent, BarcodeScannerComponent, ActionContainerComponent]
})
export class LibModule {
}
