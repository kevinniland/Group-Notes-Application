import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthProvider } from '../_services/auth.service';
import { UtilitiesService } from '../_services/utilities.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  constructor(private authService: AuthProvider, private utilitiesService: UtilitiesService, 
    private router: Router) { 

  }

  // User array - this array contains all the required credentials
  users = { username: '', password: '', email: '', firstName: '', lastName: '' };

  // This piece of code ensures that an email a user enters is in a valid format i.e. email@domain
  email = new FormControl('', [Validators.required, Validators.email]);

  // Used to display an error message if the entered email is invalid
  getErrorMessage() {
    // If no email is entered, display first message. If entered email is not in correct format, display second message
    return this.email.hasError('required') ? 'You must enter an e-mail' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onAddUser(form) {
    // if form is valid, user will be added
    if (form.valid) {

      // Check if profile image was entered, as optional.
      let profileImage: string;
      if (form.value.profileImage == null){
        profileImage = "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-PNG-715x657.png";
      }
      else {
        profileImage = form.value.profileImage;
      }

      // Create user object which is created on Firebase.
      const user: User = { username: form.value.username, password: form.value.password, email: form.value.email, firstName: form.value.firstName, 
        lastName: form.value.lastName, profileImage: profileImage };

      // Create the user, or if inputs are invalid display error message (handled by firebase)
      this.authService.signUp(user).then(
				() => {
          // Display success messages
          this.utilitiesService.presentToast("Signup successful, you have been logged into your new account."),
          this.utilitiesService.presentLoadingWithOptions(),

          //Set up profile image and username for side menu display.
          localStorage.setItem ("username", user.username),
          localStorage.setItem ("profileImage", user.profileImage),
          this.router.navigateByUrl('/home'),
          form.resetForm();
        },
				error => this.utilitiesService.presentToast(error.message + " Please try again!")
      );

    }
  }
}
