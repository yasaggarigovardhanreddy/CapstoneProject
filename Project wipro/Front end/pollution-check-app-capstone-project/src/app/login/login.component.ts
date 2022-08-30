import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from '../services/router.service';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token: String = null;
  errorMsg: string = "null";
  showPass = false;
  credentials = {
    email: "",
    password: "",
  }

  constructor(private _snackBar: MatSnackBar,
    private userauth: UserAuthenticationService,
    private router: RouterService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
    document.querySelector<HTMLElement>('.mat-simple-snack-bar-content').style.color = "tomato";
  }

  ngOnInit(): void {
  }


  onSubmit(loginForm: NgForm) {
    try {
      interface result {
        token: string,
        user: {
          id: number,
          userName: string,
          email: string,
          password: string
        }
      }
      //console.log("form submitteed", this.credentials, loginForm);
      this.userauth.login(this.credentials).subscribe((res: any) => {
        //console.log(res.user.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.userName);
        localStorage.setItem('id', res.user.id);
        this.openSnackBar("Login Sucessfull", "ok");
        this.router.goToDashboard();
      });
    } catch (error) {
      this.openSnackBar("oops!! " + error, "");
    }
  }
}