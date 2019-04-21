import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { Group } from '../_models/group.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app'; 
import * as firebase from 'firebase/app'; 

@Injectable()
export class GroupsService {
  constructor(public afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    
  }

  private setGroupDocument(group) {
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${group.id}`);
    
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

  createGroup(group: Group): any {
      this.setGroupDocument(group);
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
