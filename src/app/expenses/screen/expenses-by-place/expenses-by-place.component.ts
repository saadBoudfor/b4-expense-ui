import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/Expense";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {PlaceService} from "../../../b4-common/services/place.service";
import {PlaceExpense} from "../../../b4-common/models/PlaceExpense";
import {Address} from "../../../b4-common/models/Address";
import {Router} from "@angular/router";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";

@Component({
  selector: 'expenses-by-place',
  templateUrl: './expenses-by-place.component.html',
  styleUrls: ['./expenses-by-place.component.scss']
})
export class ExpensesByPlaceComponent implements OnInit {
  expenseBasicStats!: ExpenseBasicStats;
  expenses!: Expense[];
  googleMapUrl!: SafeResourceUrl;
  placeExpenses!: PlaceExpense[];
  showDetails = false;
  isStore: boolean = false;
  selected!: PlaceExpense;
  total = 0;

  constructor(private expenseService: ExpenseService,
              private placeService: PlaceService,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.isStore = this.router.url.indexOf('stores') !== -1;
    if (this.isStore) {
      this.placeService.getStoresRanking().subscribe(data => this.placeExpenses = data)
      this.expenseService.getBasicStoresStats().subscribe(data => this.total = data.total)
    } else {
      this.placeService.getRestaurantRanking().subscribe(data => this.placeExpenses = data)
      this.expenseService.getBasicRestaurantsStats().subscribe(data => this.total = data.total)
    }

  }

  onSelect(placeExpense: PlaceExpense) {
    if (placeExpense.place.address) {
      const url = "https://maps.google.com/maps?q=" + convertAddress(placeExpense.place.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.selected = placeExpense;
      this.showDetails = true;
      this.expenseService.getByPlace(placeExpense.place.id).subscribe(data => {
        this.expenses = data;
      })
    }
  }

  onSelectExpense($event: Expense) {
    this.router.navigate(['/expense-details'], {queryParams: {id: $event.id}});
  }
}

function convertAddress(address: Address) {
  return address.street + " " + address.zipCode + " " + address.city + " " + address.country;
}
