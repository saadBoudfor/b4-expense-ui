import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import KeenSlider from "keen-slider";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss',
    '../../../../../node_modules/keen-slider/keen-slider.min.css'] // required for styling the slider (for category)
})
export class NewProductComponent implements OnInit, AfterViewInit {
  @ViewChild("sliderRef")
  sliderRef?: ElementRef<HTMLElement>

  slider: any = null;
  productCategories = PRODUCT_CATEGORY_LIST;

  product = new Product();

  enableSubmit = false;

  constructor(private productService: ProductService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('meat', sanitizer.bypassSecurityTrustResourceUrl('assets/products/meat.svg'));
    iconRegistry.addSvgIcon('vegetable', sanitizer.bypassSecurityTrustResourceUrl('assets/products/vegetable.svg'));
    iconRegistry.addSvgIcon('water', sanitizer.bypassSecurityTrustResourceUrl('assets/products/water.svg'));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.sliderRef)
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        slidesPerView: 3,
        spacing: 10,
      })
  }

  selectCategory(selected: { name: string; active: boolean; id: number }) {
    for (let category of this.productCategories) {
      category.active = false;
    }
    selected.active = true;
    this.product.category = selected.name.toUpperCase();
    this.updateEnableSubmit();
  }

  submit() {
    console.log(this.product);
  }

  updateEnableSubmit() {
    this.enableSubmit = this.productService.isValid(this.product);
    console.log(this.enableSubmit);
  }

  getImage($event: void) {
    console.log($event);
  }
}

export const PRODUCT_CATEGORY_LIST = [
  {id: 1, name: 'meat', active: false},
  {id: 2, name: 'vegetable', active: false},
  {id: 3, name: 'water', active: false},
  {id: 4, name: 'meat', active: false},
];
