import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../data-models/Item";
import {NGXLogger} from "ngx-logger";
import {ItemUtils} from "../../../utils/ItemUtils";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item!: Item;
  expired: boolean = false;
  open: boolean = false;
  finish: boolean = false;
  expirationDate!: Date;
  expirationDateProgressValue!: number;
  quantityProgressValue!: number;
  totalQuantity!: number;

  constructor(private logger: NGXLogger) {
  }

  @Input()
  set value(_item: Item) {
    if (!!_item) {
      this.item = _item;
      const expirationDate = ItemUtils.computeExpirationDate(_item);
      if (!!expirationDate) {
        this.expirationDate = expirationDate;
        switch (ItemUtils.getStat(this.item, expirationDate)) {
          case "expired":
            this.expired = true;
            break;
          case "finish":
            this.finish = true;
            break;
          case "open":
            this.open = true;
            break;
        }

        if (this.item.product && this.item.remaining !== undefined) {
          this.totalQuantity = this.item.quantity * this.item.product?.productQuantity;
          this.quantityProgressValue = (100 * this.item.remaining) / this.totalQuantity;
        }

        if (this.item.expirationAfter && this.expirationDate && this.item.openDate && !this.expired && !this.finish) {
          const openDate = new Date(this.item.openDate);
          const tds = new Date().getTime() - openDate.getTime();
          const eds = this.expirationDate.getTime() - openDate.getTime();
          this.expirationDateProgressValue = (tds / eds) * 100;
        }
      } else {
        this.logger.error('invalid item');
      }
    }
  }


  ngOnInit(): void {
  }

}


