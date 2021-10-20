import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LibModule} from "../lib/lib.module";
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {AngularImports} from "../angular-imports";
import {RouterModule} from "@angular/router";
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from "ngx-webcam";



@NgModule({
  declarations: [
    ConfirmationComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    AngularImports,
    LibModule,
    RouterModule,
    WebcamModule
  ]
})
export class B4CommonModule { }
