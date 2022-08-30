import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToFavourite() {
    this.router.navigate(['/dashboard/favourite']);

    // location.reload();
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }

  goto404() {
    this.router.navigate(['/404']);
  }
}
