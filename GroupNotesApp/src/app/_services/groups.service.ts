import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app'; 

@Injectable()
export class GroupsService {
  private group: firebase.Group;

  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    afAuth.authState.subscribe(group => {
      if (group) {
        // Logged in
        this.group = group;
      } else {
        // Logged out
        this.group = null;
      }
    });
  } 

  createGroup(group: Group): any {
    return this.afAuth.auth.createGroupWithGroupName(group.groupName).then(() => {
      this.setGroupDocument(group);
   });
  }

  // Set up a user document on Cloud Firestore
  private setGroupDocument(user) {
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${group.email}`);
    
    let initialArray = [];

    // let initialArray = [];
    // let groupTest = {
    //   groupId: "Test",
    //   groupName: "Test"
    // };

    let groupSecured = {
      groupName: group.groupName
    };

    return groupRef.set(groupSecured);
  }

  addUserToGroup(user, groupName: string) {
    // Get a reference to the collection and logged in users document
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${groupName}`);

    // Set up new group
    let userTest = {
      username: user.username
    };

    // Get the array from the reference and push new object to it, then update/merge with existing user document.
    groupRef.get().subscribe((doc) => {
      let newGroupArray = doc.get('usersArray');
      newGroupArray.push(userTest);
      groupRef.set({ usersArray: newGroupArray }, { merge: true });
    });
  }
}
