import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../_services/utilities.service';
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private utilitiesService: UtilitiesService, private router: Router, private authService: AuthProvider) { }

  private email: any;

  ngOnInit() {
  }

  onReset(form) {
    if (form.valid) {
      // Call the reset method which will check if the email is an authenticated account and then send a reset email.
      this.authService.resetPassword(this.email).then(
				() => {
          // If successful display message and route to login page.
          this.utilitiesService.presentToast("Reset email sent successfully, please check your inbox and login.")
          this.utilitiesService.presentLoadingWithOptions(),
          this.router.navigateByUrl('/login'),
          form.resetForm();
        },
        // If error display custom error message depending on result
				error => this.utilitiesService.presentToast(error.message + " Please try again!")
      );
    } 
  }
}
