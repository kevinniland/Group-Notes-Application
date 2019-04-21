import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { User } from '../_models/user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app'; 
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore) {

    // On logged in state change, set the user.
    afAuth.authState.subscribe(user => {
      if (user) {
        // Logged in
        this.user = user;
      } else {
        // Logged out
        this.user = null;
      }
    });
  } 

  // getSignedInUser():any {
  //   return this.user;
  // }

  // Try to log in using the supplied credentials using firbase authentication.
  // It will check if the email and password match a authenticated account and then set the current logged in user using cookies
  login(email: string, password: string): any {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Send a password reset using firebase if email is an authenticated account
  resetPassword(email:string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  
  // Try to signup using the supplied credentials using firbase authentication.
  // It will check if the email doesn't already match a current account.
  // It then saves the other user data to a document on Cloud Firestore using the setUserDocument() if initial set up is successful.
  signUp(user: User): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this.setUserDocument(user);
   });
  }

  // Set up a user document on Cloud Firestore
  private setUserDocument(user) {
    // Get a reference to the collection and create a new document with the email as the name as this will be unique for every user.
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.email}`);
    
    let initialArray = [];

    // let initialArray = [];
    // let groupTest = {
    //   groupId: "Test",
    //   groupName: "Test"
    // };

    // Create a new object so that password isn't stored in database only in authentication 
    let userSecured = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      groupsArray: initialArray
    };

    // write to the reference above with the new object.
    return userRef.set(userSecured);
  }

   // Add group to user, which will be used to add group to user when joining so the users groups can be viewed.
   addGroupToUser(group, email: string) {
    // Get a reference to the collection and logged in users document
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${email}`);

    // Set up new group
    let groupTest = {
      groupId: group.id,
      groupName: group.name
    };

    // Get the array from the reference and push new object to it, then update/merge with existing user document.
    userRef.get().subscribe((doc) => {
      let newUserArray = doc.get('groupsArray');
      newUserArray.push(groupTest);
      userRef.set({ groupsArray: newUserArray }, { merge: true });
    });
  }

  // Get current logged in user using AngularFire's built in method
  getSignedInUser(): any {
    return this.afAuth.auth.currentUser;
  }

  // Get the full details stored in Cloud Firestore for a logged in user.
  // This could be used to get details througout the application.
  getSignedInUserDetails(): Observable<any>  {
    let user: any = this.getSignedInUser();

    // 1. make a reference
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.email}`);

    // 2. get the Observable
    return userRef.valueChanges();
  }

  // Log the user out using AngularFire's built in log out method 
  logOut() {
    return this.afAuth.auth.signOut();
  }
}