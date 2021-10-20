import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularImports} from "../angular-imports";
import {TranslateModule} from "@ngx-translate/core";
import { NavigationComponent } from './navigation/navigation.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularImports
  ],
  exports:[NavigationComponent, ProgressComponent]
})
export class LibModule { }
