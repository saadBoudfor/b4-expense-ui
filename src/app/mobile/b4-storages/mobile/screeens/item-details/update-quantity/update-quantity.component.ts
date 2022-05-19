import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../../../../../services/storages/navigation.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {ItemRepository} from "../../../../../../repositories/storages/item-repository.service";

@Component({
  selector: 'update-quantity',
  templateUrl: './update-quantity.component.html',
  styleUrls: ['./update-quantity.component.scss']
})
export class UpdateQuantityComponent implements OnInit {
  id!: number;
  quantity: number = 0;
  comment: string = '';

  constructor(private navigationService: NavigationService,
              private itemRepository: ItemRepository,
              private logger: NGXLogger,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.navigationService.getQueryParam('itemId', {redirectionURL: '/storage'});
    const remaining = this.navigationService.getParamIgnoreChecks('remaining');
    if (!!remaining) {
      this.quantity = remaining;
    }
  }

  backToItem() {
    this.router.navigate(['/storage/item'], {queryParams: {itemId: this.id}}).then(() => {
      this.logger.debug('back to item details screen. Id: ' + this.id);
    })
  }

  updateQuantity() {
    this.itemRepository
      .updateQuantity({quantity: this.quantity, comment: this.comment}, this.id)
      .subscribe(saved => {
        this.logger.info('update item quantity: ' + this.quantity + ' success (id=' + saved.id + ')');
        this.backToItem();
      }, error => {
        this.logger.error('failed to update item quantity', {error});
      })
  }
}
