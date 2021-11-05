import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpenseLine} from "../../models/ExpenseLine";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  expenseLine: ExpenseLine | undefined ;

  @Output()
  close = new EventEmitter();

  @Output()
  delete = new EventEmitter<ExpenseLine>();

  ngOnInit(): void {
  }

  clickRight($event: any) {
    this.close.emit('close');
  }
}
