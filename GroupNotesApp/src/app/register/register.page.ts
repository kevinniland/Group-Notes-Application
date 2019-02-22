import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private service: LoginService) { 

  }

  users = {};

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {

  }

  // TESTING
  logForm() {
    console.log(this.users)
  }

  // Used to display an error message if the entered email is invalid
  getErrorMessage() {
    // If no email is entered, display first message. If entered email is not in correct format, display second message
    return this.email.hasError('required') ? 'You must enter an e-mail' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onAddUser(form: NgForm) {
    // if form is valid, user will be added
    if (form.valid) {
      /* Uses the UserService to send user data up to the server. Once added, the form will be reset. If not valid, user will be asked
      to fill out the form correctly */
      this.service.addUser(form.value.username, form.value.password, form.value.email, form.value.firstName, form.value.lastName, 
        form.value.profileImage).subscribe();

      console.log(form.value);
      form.resetForm();
    } else {
      return;
    }
  }

  loginPageNav() {
    console.log("Success");
  }
}
