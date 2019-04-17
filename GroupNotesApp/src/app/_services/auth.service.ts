import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../_models/user.model';

@Injectable()
export class AuthProvider {
  constructor(public afireauth: AngularFireAuth) {

  } 
  
  login(credentials: User) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })

    return promise;
  }
}