import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../data-models/Item";
import {NGXLogger} from "ngx-logger";

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
      const expirationDate = computeExpirationDate(_item);
      if (!!expirationDate) {
        this.expirationDate = expirationDate;
        switch (getStat(this.item, expirationDate)) {
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

function computeExpirationDate(item: Item): Date | null {
  if (item.expirationAfter && item.expirationDate && item.openDate) {
    const openDate = new Date(item.openDate);
    const expirationAfterOpenDate = new Date(openDate.getTime() + durationToMs(item.expirationAfter));
    const productExpirationDate = new Date(item.expirationDate);

    if (productExpirationDate.getTime() - expirationAfterOpenDate.getTime() < 0) {
      return productExpirationDate;
    } else {
      return expirationAfterOpenDate;
    }
  }
  return !!item?.expirationDate ? new Date(item.expirationDate) : null;
}


function getStat(item: Item, expirationDate: Date): 'open' | 'default' | 'expired' | 'finish' {
  if (expirationDate) {
    const now = new Date();

    if (item.remaining == 0) {
      return 'finish';
    }

    // if expiration date < now => expired
    if (expirationDate.getTime() - now.getTime() < 0) {
      return 'expired';
    }

    if (!!item.openDate) {
      return 'open';
    }
  }
  return 'default'
}

function durationToMs(duration: { days?: number, hours?: number, minutes?: number }) {
  let res = 0;
  if (duration.days) {
    res += duration.days * 24 * 60;
  }
  if (duration.hours) {
    res += duration.hours * 60;
  }
  if (duration.minutes) {
    res += duration.minutes;
  }
  return res * 60000;
}

