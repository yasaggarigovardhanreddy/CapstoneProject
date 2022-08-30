import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
// import { AQI_API_KEY } from "../../../.env"
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AqiDataService {
  url = "https://api.airvisual.com/v2/";
  key = environment.AirVisual.AQI_API_KEY;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  //snackbar error bar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
    document.querySelector<HTMLElement>('.mat-simple-snack-bar-content').style.color = "tomato";
  }

  getCityDataByCordinates(lat:number,lon:number){
    return this.http.get(`${this.url}nearest_city?lat=${lat}&lon=${lon}&key=${this.key}`).pipe(
      catchError(error => {
        let errMsg: String;
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`
        } else {
          errMsg = this.getServerErrorMessage(error);
        }
        this.openSnackBar("oops! " + errMsg, "");
        console.log(errMsg);
        return throwError(errMsg);
      })
    );
  }

  allCountries() {
    return this.http.get(`${this.url}countries?key=${this.key}`).pipe(
      catchError(error => {
        let errMsg: String;
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`
        } else {
          errMsg = this.getServerErrorMessage(error);
        }
        this.openSnackBar("oops! " + errMsg, "");
        console.log(errMsg);
        return throwError(errMsg);
      })
    );
  }

  getStates(country: String) {
    return this.http.get(`${this.url}states?country=${country}&key=${this.key}`).pipe(
      catchError(error => {
        let errMsg: String;
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`
        } else {
          errMsg = this.getServerErrorMessage(error);
        }
        this.openSnackBar("oops! " + errMsg, "");
        console.log(errMsg);
        return throwError(errMsg);
      })
    );
  }

  getCities(state: String, country: String) {
    return this.http.get(`${this.url}cities?state=${state}&country=${country}&key=${this.key}`).pipe(
      catchError(error => {
        let errMsg: String;
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`
        } else {
          errMsg = this.getServerErrorMessage(error);
        }
        this.openSnackBar("oops! " + errMsg, "");
        console.log(errMsg);
        return throwError(errMsg);
      })
    );
  }

  getCityData(state: String, country: String, city: String) {
    return this.http.get(`${this.url}city?city=${city}&state=${state}&country=${country}&key=${this.key}`).pipe(
      catchError(error => {
        let errMsg: String;
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`
        } else {
          errMsg = this.getServerErrorMessage(error);
        }
        this.openSnackBar("oops! " + errMsg, "");
        console.log(errMsg);
        return throwError(errMsg);
      })
    );
  }

  //generate common errors
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `API ERROR!! Not Found: ${error.message}`;
      }
      case 429 : {
        return `API ERROR!! Too Many Requests!! Please Try Again: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
