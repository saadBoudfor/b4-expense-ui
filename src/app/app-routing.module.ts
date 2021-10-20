import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewProductComponent} from "./expenses/screen/new-product/new-product.component";
import {ConfirmationComponent} from "./b4-common/confirmation/confirmation.component";
import {CameraComponent} from "./b4-common/camera/camera.component";

const routes: Routes = [
  {path: 'new-product', component: NewProductComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'camera', component: CameraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
