import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularImports} from "../angular-imports";
import {TranslateModule} from "@ngx-translate/core";
import { NavigationComponent } from './navigation/navigation.component';
import { ProgressComponent } from './progress/progress.component';
import { PhotoUploaderComponent } from './photo-uploader/photo-uploader.component';
import { RoundedIconComponent } from './rounded-icon/rounded-icon.component';
import { ChoiceComponent } from './choice/choice.component';
import {RouterModule} from "@angular/router";
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import {BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";
import { MoreInfoComponent } from './more-info/more-info.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ProgressComponent,
    PhotoUploaderComponent,
    RoundedIconComponent,
    ChoiceComponent,
    BarcodeScannerComponent,
    MoreInfoComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        AngularImports,
        RouterModule,
        BarcodeScannerLivestreamModule
    ],
  exports: [NavigationComponent, MoreInfoComponent, ProgressComponent, PhotoUploaderComponent, RoundedIconComponent, ChoiceComponent, BarcodeScannerComponent]
})
export class LibModule { }
