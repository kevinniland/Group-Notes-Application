import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { RegisterPage } from '../register/register.page';
import { UtilitiesService } from '../_services/utilities.service';
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  constructor(private loginService: LoginService, private utilitiesService: UtilitiesService, 
    private router: Router, private authService: AuthProvider) {

  }

  users = [];
  // Error message
  loginError: string;

  ngOnInit() {
  }

  onLogin(form) {
    if (form.valid) {

      let credentials = {
        email: form.value.email,
        password: form.value.password
      };

      this.authService.login(credentials).then(
				() => {
          this.utilitiesService.presentLoadingWithOptions(),
          this.router.navigateByUrl('/home'),
          this.authService.getSignedInUserDetails().subscribe(data =>{
            localStorage.setItem ("username", data.username);
            localStorage.setItem ("profileImage", data.profileImage);
          });
        },
				error => this.utilitiesService.presentToast(error.message + " Please try again!")
      );
      
    } else 
    {
      this.utilitiesService.presentToast("Fields are emplty. Please enter values")
      return;
    }
  }
}
