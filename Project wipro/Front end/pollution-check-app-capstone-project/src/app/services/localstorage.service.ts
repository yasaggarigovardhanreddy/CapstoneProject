import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setEmail(email: any) {
    localStorage.setItem('email', email);
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  removeEmail() {
    localStorage.removeItem('email');
  }

  setName(name: any) {
    localStorage.setItem('name', name);
  }

  getName() {
    return localStorage.getItem('name');
  }

  removeName() {
    localStorage.removeItem('name');
  }
}
