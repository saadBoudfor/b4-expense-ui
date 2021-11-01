import {Component, Input, OnInit, Output} from '@angular/core';
import {AddressGov, PlaceService} from "../services/place.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Place} from "../models/Place";
import {Address} from "../models/Address";
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})
export class PlaceAutocompleteComponent implements OnInit {
  autocompleteAddressControl = new FormControl();
  placeControl = new FormControl();
  filteredAddresses: Observable<AddressGov[]> | undefined;
  filteredPlace: Observable<Place[]> | undefined;
  // flag that allow users to add new place
  enablePlaceUnknownForm: boolean = false;
  isPlaceUnknown: boolean = false;
  place = new Place();

  @Input()
  type: 'restaurant' | 'store' = 'store';

  @Output()
  selected = new EventEmitter<Place>();

  constructor(private addressService: PlaceService) {
  }

  ngOnInit() {
    this.place.type = this.type === 'restaurant' ? 'RESTAURANT' : 'STORE';
    this.autocompleteAddressControl.valueChanges.subscribe(inputValue => {
      // if searchedStr is string
      if (inputValue && inputValue.length) {
        this.filteredAddresses = this.addressService.findAddresses(inputValue);
      } else {
        this.place.address = convertToAddress(inputValue);
        this.selected.emit(this.place);
      }
    });

    this.placeControl.valueChanges.subscribe(inputValue => {
      // if searchedStr is string
      if (inputValue && inputValue.length >= 3) {
        this.place.name = inputValue;
        this.filteredPlace = this.type === 'store'
          ? this.addressService.findStores(inputValue) : this.addressService.findRestaurant(inputValue);
        this.filteredPlace.subscribe(data => {
          this.isPlaceUnknown = data.length === 0;
        })
      } else {
        this.selected.emit(inputValue)
      }
    })
  }

  displayAddressFn(address: AddressGov): string {
    return address && address.label ? address.label : '';
  }

  displayPlaceFn(place: Place): string {
    return place && place.name ? place.name : '';
  }
}

function convertToAddress(addressGov: AddressGov): Address {
  return {
    street: (addressGov.housenumber ? addressGov.housenumber : '') + ' ' + (addressGov.street ? addressGov.street : ''),
    zipCode: addressGov.postcode,
    city: addressGov.city,
    country: 'France'
  }
}
