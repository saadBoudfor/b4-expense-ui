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
import {ActionContainerComponent} from './action-container/action-container.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ProgressComponent,
    PhotoUploaderComponent,
    RoundedIconComponent,
    ChoiceComponent,
    BarcodeScannerComponent,
    MoreInfoComponent,
    ActionContainerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularImports,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavigationComponent,
    MoreInfoComponent,
    ProgressComponent,
    PhotoUploaderComponent,
    RoundedIconComponent,
    ChoiceComponent,
    BarcodeScannerComponent,
    ActionContainerComponent
  ]
})
export class LibModule {
}
