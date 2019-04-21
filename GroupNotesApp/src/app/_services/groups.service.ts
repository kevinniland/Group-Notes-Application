import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { Group } from '../_models/group.model';
import { AuthProvider } from '../_services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'; 

@Injectable()
export class GroupsService {
  constructor( private afStore: AngularFirestore, private authService: AuthProvider) {
    
  }

  createGroup(group: Group): any {
    this.setGroupDocument(group);
  }

  setGroupDocument(group) {

    this.authService.getSignedInUserDetails().subscribe(data =>{
      const newGroup: Group = { 
        groupId: data.uid,
        groupName: group.groupName,
        profileImage: group.profile,
        groupMembers: [
          { 
            username: data.username,
            email: data.email,
          }
        ],
      };
    });


    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${group.groupId}`);
    
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


  addUserToGroup(user, groupid: number) {
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${groupid}`);

    let userTest = {
      username: user.username
    };

    groupRef.get().subscribe((doc) => {
      let newGroupArray = doc.get('usersArray');
      
      newGroupArray.push(userTest);
      groupRef.set({ usersArray: newGroupArray }, { merge: true });
    });
  }
}
