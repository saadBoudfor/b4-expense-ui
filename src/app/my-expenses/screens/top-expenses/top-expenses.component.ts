import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {PlaceExpense} from "../../../b4-common/models/PlaceExpense";
import {DomSanitizer} from "@angular/platform-browser";
import {Place} from "../../../b4-common/models/Place";
import {Address} from "../../../b4-common/models/Address";
import {ExpenseRepository} from "../../repositories/expense-repository.service";

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
              private expenseRepository: ExpenseRepository) {
  }

  ngOnInit(): void {
    const restaurantURL = this.activatedRoute.snapshot.routeConfig?.path;
    this.isRestaurantComponent = restaurantURL?.indexOf('restaurants') !== -1;
    let request = this.expenseRepository.getTopFrequentedStores();
    if (this.isRestaurantComponent) {
      request = this.expenseRepository.getTopFrequentedRestaurants();
    }
    request.subscribe(places => this.placeExpenses = places);
  }

  openDetails(place: Place) {
    this.setMap(place);
    this.selected = place;
  }

  setMap(place: Place) {
    const url = "https://maps.google.com/maps?q=" + convertAddress(place.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}

const logId = '[TopExpensesComponent] ';
