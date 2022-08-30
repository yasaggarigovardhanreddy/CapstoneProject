import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AqiDataService } from '../services/aqi-data.service';
import { RouterService } from '../services/router.service';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { LocalstorageService } from '../services/localstorage.service';

import { MapboxService, Feature } from '../services/mapbox.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('countryInput') countryInput: ElementRef<HTMLInputElement>;
  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  cityNames: string[] = [];
  selectedCityName ="";
  isAdvanceSearch=false;

  search(event: any) {
    console.log("Search",this.cityFormControl,event);

    const searchTerm = event.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.cityNames = features.map(feat => {
            console.log(feat,feat.center);
            
            return `${feat.place_name} (${feat.center[0]},${feat.center[1]})`});
        });
    } else {
      this.cityNames = [];
    }
  }

  onSelect(singleCity: string) {
    this.selectedCityName=singleCity;
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
    this.cityNames = [];
  }

  switchingSearchMode(){
    this.isAdvanceSearch=!this.isAdvanceSearch;
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
  }

  countryFormControl = new FormControl('', [Validators.required]);
  stateFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });


  separatorKeysCodes: number[] = [ENTER, COMMA];
  username: String = "";
  selectedCountry: string[] = [];
  allCountries: string[] = [];
  // allCountries: string[] = ['aaa', 'aaaaaaa', 'ffffff', 'sssss'];
  filteredCountries: Observable<string[]>;

  selectedState: string[] = [];
  allStates: string[] = [];
  filteredStates: Observable<string[]>;

  selectedCity: string[] = [];
  allCities: string[] = [];
  filteredCities: Observable<string[]>;

  outputData: {
    country?: string,
    state?: string,
    city?: string,
    cordinates?: {
      lon: number,
      lat: number
    }
  } = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };

  ngOnInit() { }

  constructor(private _formBuilder: FormBuilder, 
    private aqiData: AqiDataService,
    private mapboxService: MapboxService,
    private router: RouterService,
    private auth: UserAuthenticationService, 
    private locals: LocalstorageService) {
    //username from token
    this.username = localStorage.getItem('userName');
    //populate countries
    aqiData.allCountries().subscribe((resp: any) => {
      for (const data in resp.data) {
        this.allCountries.push(resp.data[data].country)
      }
    });

    this.filteredCountries = this.countryFormControl.valueChanges.pipe(
      startWith(null),
      map((country: string | null) => (country ? this._countryFilter(country) : this.allCountries.slice())),
    );

    this.filteredStates = this.stateFormControl.valueChanges.pipe(
      startWith(null),
      map((state: string | null) => (state ? this._stateFilter(state) : this.allStates.slice())),
    );

    this.filteredCities = this.cityFormControl.valueChanges.pipe(
      startWith(null),
      map((city: string | null) => (city ? this._cityFilter(city) : this.allCities.slice())),
    );

  }

  //common add method
  add(event: MatChipInputEvent, flag: String): void {
    console.log("add");

    const value = (event.value || '').trim();

    // Add our country
    // if (value) {
    //   // this.countries.push(value);
    //   this.countries[0]=value;
    // }

    // Clear the input value
    event.chipInput!.clear();

    switch (flag) {
      case "country": {
        this.firstFormGroup.get("firstCtrl").setValue(null);
        break;
      }
      case "state": {
        this.secondFormGroup.get("secondCtrl").setValue(null);
        break;
      }
      case "city": {
        this.thirdFormGroup.get("thirdCtrl").setValue(null);
        break;
      }
      default:
        break;
    }
  }


  //common remove method
  remove(item: string, flag: string): void {
    switch (flag) {
      case "country": {
        const index = this.selectedCountry.indexOf(item);
        if (index >= 0) {
          this.selectedCountry.splice(index, 1);
        }
        break;
      }
      case "state": {
        console.log("state");

        const index = this.selectedState.indexOf(item);
        if (index >= 0) {
          this.selectedState.splice(index, 1);
        }
        break;
      }
      case "city": {
        const index = this.selectedCity.indexOf(item);
        if (index >= 0) {
          this.selectedCity.splice(index, 1);
        }
        break;
      }
      default: {
        break;
      }
    }
  }


  //common selected method
  selected(event: MatAutocompleteSelectedEvent, flag: String): void {
    switch (flag) {
      case "country": {
        console.log("selected");

        this.selectedCountry[0] = event.option.viewValue;
        this.countryInput.nativeElement.value = '';
        this.firstFormGroup.get("firstCtrl").setValue(null);
        if (this.selectedCountry != []) {
          this.allStates = [];
          this.aqiData.getStates(this.selectedCountry[0]).subscribe((resp: any) => {
            for (const data in resp.data) {
              this.allStates.push(resp.data[data].state)
            }
            console.log(resp, this.allStates);

          });
        }
        break;
      }
      case "state": {
        this.selectedState[0] = event.option.viewValue;
        this.stateInput.nativeElement.value = '';
        this.secondFormGroup.get("secondCtrl").setValue(null);
        if (this.selectedState != []) {
          this.allCities = [];
          this.aqiData.getCities(this.selectedState[0], this.selectedCountry[0]).subscribe((resp: any) => {
            for (const data in resp.data) {
              this.allCities.push(resp.data[data].city)
            }
            console.log(resp, "allcitiesss", this.allCities);
          });
        }
        break;
      }
      case "city": {
        this.selectedCity[0] = event.option.viewValue;
        this.cityInput.nativeElement.value = '';
        this.thirdFormGroup.get("thirdCtrl").setValue(null);
        break;
      }
      default: {
        break;
      }
    }
  }

  showResult(flag:number) {
    if (flag==1 && this.selectedCountry.length!==0, this.selectedCity.length!==0, this.selectedState.length!==0) {
      this.outputData.country = this.selectedCountry[0];
      this.outputData.state = this.selectedState[0];
      this.outputData.city = this.selectedCity[0];
      console.log("outputData", this.outputData);
    }else if(flag==0 && this.selectedCityName!=""){
      this.outputData = {
        country: null,
        state: null,
        city: null,
        cordinates: {
          lon: null,
          lat: null
        }
      };
      const tempCordinates = this.selectedCityName.split('(')[1].split(')')[0].split(',');
      this.outputData.cordinates.lon=Number(tempCordinates[0]);
      this.outputData.cordinates.lat=Number(tempCordinates[1]);
      console.log("cordinates", tempCordinates);
    }
  }

  resetForm() {
    this.selectedCity = [];
    this.selectedCountry = [];
    this.selectedState = [];
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
  }

  //filters functions
  private _countryFilter(value: string): string[] {
    console.log("countryfilter", this.allCountries, this.filteredCountries);
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
    this.allStates = [];
    this.allCities = [];
    const filterValue = value.toLowerCase();
    return this.allCountries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _stateFilter(value: string): string[] {
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
    this.allCities = [];
    const filterValue = value.toLowerCase();
    console.log("staefilter", filterValue, this.allStates);
    return this.allStates.filter(state => state.toLowerCase().includes(filterValue));
  }

  private _cityFilter(value: string): string[] {
    this.outputData = {
      country: null,
      state: null,
      city: null,
      cordinates: {
        lon: null,
        lat: null
      }
    };
    const filterValue = value.toLowerCase();
    return this.allCities.filter(city => city.toLowerCase().includes(filterValue));
  }

  // Code for logout conformation
  logOut() {
    this.auth.logout();
    this.router.goToLogin();
  }
}
