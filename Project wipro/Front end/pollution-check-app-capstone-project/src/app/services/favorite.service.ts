import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from '../models/lot';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  port = '8089';
  userid = localStorage.getItem('id');
  api_endpoint = `http://localhost:${this.port}/api/v1/fav/${this.userid}`;
  
  constructor(
    private httpClient:HttpClient,
    private auth:UserAuthenticationService
  ) { }

  getAllByUserId() {
    return this.httpClient.get(this.api_endpoint);
   }
   deleteByUserId(lot: Lot){
    const httpParams = new HttpParams({
     fromObject:{
       lon : lot.lon,
       lat : lot.lat
     }
    });
      return this.httpClient.delete(this.api_endpoint,{params:httpParams});
     
     }
  addFav(lot: Lot) {
    console.log("In add",lot);
    return this.httpClient.post(this.api_endpoint,lot);
  }
}
