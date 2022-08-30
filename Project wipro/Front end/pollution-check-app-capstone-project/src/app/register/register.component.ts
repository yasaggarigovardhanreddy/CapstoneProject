import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showPass = false;
  credentials = {
    userName: "",
    email: "",
    password: "",
  }

  constructor(private _snackBar: MatSnackBar,
    private userauth:UserAuthenticationService,
    private router:RouterService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
    document.querySelector<HTMLElement>('.mat-simple-snack-bar-content').style.color = "tomato";
  }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm) {
    try {
      console.log("form submitteed", this.credentials.userName, registerForm);
      this.userauth.register(this.credentials);
      this.openSnackBar("Registeration Successful","");
      this.router.goToLogin();
    } catch (error) {
      this.openSnackBar("oops!! "+error,"");
    }
  }

}
