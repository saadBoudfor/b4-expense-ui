import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {PlaceExpense} from "../../../../data-model/address/PlaceExpense";
import {DomSanitizer} from "@angular/platform-browser";
import {Place} from "../../../../data-model/address/Place";
import {Address} from "../../../../data-model/address/Address";
import {ExpenseRepository} from "../../../../repositories/expenses/expense-repository.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'top-expenses',
  templateUrl: './top-expenses.component.html',
  styleUrls: ['./top-expenses.component.scss']
})
export class TopExpensesComponent implements OnInit {
  isRestaurantComponent: boolean = false;
  placeExpenses!: PlaceExpense[];
  googleMapUrl: any;
  selected!: Place;

  constructor(private activatedRoute: ActivatedRoute,
              private logger: NGXLogger,
              private sanitizer: DomSanitizer,
              private snackbarService: MatSnackBar,
              private expenseRepository: ExpenseRepository) {
  }

  ngOnInit(): void {
    this.logger.info('load top frequented places (restaurants/store) page')
    const restaurantURL = this.activatedRoute.snapshot.routeConfig?.path;
    this.isRestaurantComponent = restaurantURL?.indexOf('restaurants') !== -1;
    let request = this.expenseRepository.getTopFrequentedStores();
    if (this.isRestaurantComponent) {
      request = this.expenseRepository.getTopFrequentedRestaurants();
    }
    request.subscribe(places => this.placeExpenses = places, error => {
      const message = 'failed to load top frequented places';
      this.snackbarService.open(message);
      this.logger.error(message, {error});
    });
  }

  openDetails(place: Place) {
    this.selected = place;
    const url = "https://maps.google.com/maps?q=" + convertAddress(place.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}
