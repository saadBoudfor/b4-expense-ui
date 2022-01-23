import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpenseLine} from "../../../../models/ExpenseLine";
import {Product} from "../../../../models/Product";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() {
  }

  @Input()
  enableValidate = false;

  @Input()
  expenseLine!: ExpenseLine;

  @Output()
  close = new EventEmitter();

  @Output()
  delete = new EventEmitter<ExpenseLine>();

  @Output()
  selectedProduct = new EventEmitter<Product>();

  @Input()
  product!: Product | undefined;

  ngOnInit(): void {
    if (this.expenseLine) {
      this.product = this.expenseLine.product;
    }
  }

  clickRight($event: any) {
    this.close.emit('close');
  }
}
