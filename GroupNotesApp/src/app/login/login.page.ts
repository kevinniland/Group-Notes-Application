import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.service';
// import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register.page';
import { UtilitiesService } from '../_services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  constructor(private loginService: LoginService, private utilitiesService: UtilitiesService, private router: Router,) {

  }

  // Array to store information pertaining to users
  users = [];

  ngOnInit() {
    //localStorage.clear();
  }

  onLogin(form) {
    if (form.valid) {
      this.loginService.getUsersData().subscribe (data => {
        this.users = data;

        // for loop to iterate through all users
        for (var i = 0; i < this.users.length; i++) {
          /* if the entered username and password equal a username and password stored in the users array, the user is logged in. localstorage
          is used to achieve this. The username and profileImage is set. If username or password is invalid, the user will not be 
          logged in */
          if (form.value.username == this.users[i].username && form.value.password == this.users[i].password) {
            localStorage.setItem ("username", this.users[i].username);
            localStorage.setItem ("profileImage", this.users[i].profileImage);

            this.utilitiesService.presentLoadingWithOptions();

            this.router.navigateByUrl('/home');
          }
        } 
      })
    } else {
      return;
    }
  }
}
