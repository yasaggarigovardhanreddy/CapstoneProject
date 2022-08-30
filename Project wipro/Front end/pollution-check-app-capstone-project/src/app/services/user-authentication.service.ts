import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  port = '8084';
  api_endpoint = `http://localhost:${this.port}/api/v1/auth`;

  constructor(
    private httpClient: HttpClient,
    private localStrorageService: LocalstorageService,
    private routerService: RouterService,
    private _snackBar: MatSnackBar
  ){}
  login(user: { email: string; password: string }) {
    return this.httpClient.post(`${this.api_endpoint}/login`, user)
  }

  register(user: User) {
    console.log(user);
    return this.httpClient.post(`${this.api_endpoint}/register`, user).subscribe((result)=>{
      console.warn("result",result);
    });
  }

  isLoggedIn() {
    return this.localStrorageService.getToken() ? true : false;
  }

  logout() {
    this._snackBar.open(`Hope To See You Soon, ${localStorage.getItem('userName')}`, '', {
      duration: 2000,
    });
    this.localStrorageService.removeToken();
    localStorage.removeItem('userName');
    localStorage.removeItem('id');


    // this.routerService.goToDashboard();
  }

  getToken() {
    return this.localStrorageService.getToken();
  }
}
