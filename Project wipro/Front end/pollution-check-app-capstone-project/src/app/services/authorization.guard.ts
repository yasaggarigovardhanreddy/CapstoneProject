import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  
  constructor(private auth:UserAuthenticationService,
    private route : Router){}

  canActivate(): boolean  {
      if(this.auth.isLoggedIn()){
        return true
      }else{
        this.route.navigate(['/login'])
        return false;
      }
  }
  
}
