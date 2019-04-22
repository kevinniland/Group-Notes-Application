import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { Group } from '../_models/group.model';
import { AuthProvider } from '../_services/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'; 
import { ifError } from 'assert';

@Injectable()
export class GroupsService {
  constructor( private afStore: AngularFirestore, private authService: AuthProvider) {
    
  }

  // Get all groups from database
  getAllGroups(): any {
    const groupRef: AngularFirestoreCollection<any> = this.afStore.collection(`groups`);

    return groupRef.valueChanges()
  }

  // Create a new group and set up document
  createGroup(group: Group) {
    this.setGroupDocument(group);
  }

  private setGroupDocument(group) {

    // To generate a random group ID I have adapted the code from the link below. 
    // Math.random() is not truly random but it takes a lot of iterations to see similarities.
    // It gets a string of 15 random letters and numbers.
    // https://stackoverflow.com/a/8084248
    let randomGroupId = Math.random().toString(36).substr(2, 15);

    // Get the signed in user details which is used to populate the first group memeber (owner)
    // And build up object to be saved to database
    this.authService.getSignedInUserDetails().subscribe(data =>{
      const newGroup: Group = { 
        groupId: randomGroupId,
        groupName: group.groupName,
        groupDescription: group.groupDescription,
        profileImage: group.profilePicture,
        groupMembers: [
          { 
            username: data.username,
            email: data.email,
            owner: true,
          }
        ],
      };

      // Set the group id which will load on the home page
      // And get reference to a new document on the Firestore with the new random group id
      sessionStorage.setItem ("groupId", randomGroupId);
      const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${newGroup.groupId}`);

      // Write object to the database
      groupRef.set(newGroup);
    });
  }

  addUserToGroup(groupId: string) {
    const groupRef: AngularFirestoreDocument<any> = this.afStore.doc(`groups/${groupId}`);

    //let ifFound: boolean = this.checkIfUserExists(groupRef);

    // if (ifFound != true){

    // }
    this.authService.getSignedInUserDetails().subscribe(data =>{

      let user = {
        username: data.username,
        email: data.email,
        owner: false,
      };

      groupRef.get().subscribe((doc) => {
        let newGroupArray = doc.get('groupMembers');
        
        newGroupArray.push(user);
        groupRef.set({ groupMembers: newGroupArray }, { merge: true });
      });
    });
  }

  checkIfUserExists(groupRef: AngularFirestoreDocument<any>): boolean{

    groupRef.get().subscribe((doc) => {
      let newGroupArray = doc.get('groupMembers');
      
      if (newGroupArray.filter(found => found.email === 'Magenic').length > 0) {
        
      }
    });

    //groupRef.where('players', 'array-contains', {active : false, name : _name}))

    return true;
  }
}
