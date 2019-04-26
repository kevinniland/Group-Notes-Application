// Imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { User } from '../_models/user.model';
import { UtilitiesService } from '../_services/utilities.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { auth } from 'firebase/app'; 
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore, public utilitiesService: UtilitiesService,
    public router: Router) {
    // On logged-in state change, set the user
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        // Set the current user to null i.e the user is logged out
        this.user = null;
      }
    });
  } 

  /* 
  * Try to log in using the supplied credentials using Firbase authentication
  * It will check if the email and password match a authenticated account and then set the current logged in user using cookies
  */
  login(email: string, password: string): any {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Send a password reset using Firebase if the email is an authenticated account
  resetPassword(email:string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  
  /*
  * Try to signup using the supplied credentials using Firbase authentication.
  * It will check if the email doesn't already match a current account.
  * It then saves the other user data to a document on Cloud Firestore using the setUserDocument() if initial set up is successful.
  */
  signUp(user: User): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this.setUserDocument(user);
   });
  }

  // Set up a user document on Cloud Firestore
  private setUserDocument(user) {
    // Get a reference to the collection and create a new document with the email as the name as this will be unique for every user
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.email}`);
    
    let initialArray = [];

    // Create a new user object so that password isn't stored in database - only in authentication 
    let userSecured = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      groupsArray: initialArray
    };

    // Write to the reference above with the new object
    return userRef.set(userSecured);
  }

  // Get current logged in user using AngularFire's built in method
  getSignedInUser(): any {
    return this.afAuth.auth.currentUser;
  }

  // Get the full details stored in Cloud Firestore for a logged in user.
  // This could be used to get details througout the application.
  getSignedInUserDetails(): Observable<any>  {
    let user: any = this.getSignedInUser();

    // 1. Make reference
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.email}`);

    // 2. Get the Observable
    return userRef.valueChanges();
  }

  // Log the user out using AngularFire's built in log out method 
  logOut() {
    return this.afAuth.auth.signOut();
  }

  // Check the user is signed in. If not, route to the login page
  // This method will be used across the application as a route guard
  checkIfSignedIn(){
    setTimeout(() => {
      if (this.user == null){
        this.router.navigateByUrl('/login');
        this.utilitiesService.presentToast("Please login or signup to access application.");
        return;
      }
    }, 600);
  }

  // Retrieves and displays all users from firebase
  getAllUsers(): any {
    const userRef: AngularFirestoreCollection<any> = this.afStore.collection(`users`);

    return userRef.valueChanges()
  }

  viewUserProfile(username: string) {

  }
}