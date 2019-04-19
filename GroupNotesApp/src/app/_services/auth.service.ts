import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app'; 
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore,) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  } 

  login(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }
  
  signUp(credentials: User) {
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
      if (result) {
        alert("Registration Success!")
        
        // If sucess then save user credentials to database
        this.setUserDocument(credentials);
      }
    }
    catch (e) {
      alert("Registration failed")
    }
  }

  private setUserDocument(user) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.username}`);

    return userRef.set(user)
  }

  getUser() {
    return this.afAuth.auth.currentUser;
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }
}