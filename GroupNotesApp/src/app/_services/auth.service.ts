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
  linkRef: AngularFirestoreDocument<any>;
  link: Observable<any>;
  path: string;

  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore) {

    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.user = user;
    //   } else {
    //     this.user = null;
    //   }
    // });
  } 

  // getSignedInUser():any {
  //   return this.user;
  // }

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
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.email}`);

    return userRef.set(user)
  }

  getSignedInUser(): any {
    return this.afAuth.auth.currentUser;
  }

  getSignedInUserDetails(): Observable<any>  {
    let user: any = this.getSignedInUser();

    // 1. make a reference
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.email}`);

    // 2. get the Observable
    return userRef.valueChanges();
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }
}