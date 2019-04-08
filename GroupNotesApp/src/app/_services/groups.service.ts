import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../_models/group.model';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  firegroup = firebase.database().ref('/groups');
  myGroups: Array<any> = [];
  currentGroup: Array<any> = [];
  currentGroupName;
  groupMessages;

  constructor(private http: HttpClient, public events: Events) { 

  }

  // Creates a new group
  addGroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        // messageBoard: '',
        owner: firebase.auth().currentUser.uid
      }).then(() => {
        resolve(true);
        }).catch((err) => {
          reject(err);
      })
    });

    return promise;
  }

  // Get all groups
  getMyGroups() {
    this.firegroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.myGroups = [];
      if(snapshot.val() != null) {
        var temp = snapshot.val();

        for (var key in temp) {
          var newgroup = {
            groupName: key
          }
          this.myGroups.push(newgroup);
        }
      }

      this.events.publish('newgroup');
    })
  }

  // Enter group
  enterGroup(groupname) {
    if (groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentGroup = [];

          for (var key in temp) {
            this.currentGroup.push(temp[key]);
          }

          this.currentGroupName = groupname;

         this.events.publish('Entered group successfully');
        }
      })
    }
  }

  // Adds a member to the group
  addMember(newmember) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentGroupName).child('members').push(newmember).then(() => {
        this.firegroup.child(newmember.uid).child(this.currentGroupName).set({
          owner: firebase.auth().currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      })

      this.enterGroup(this.currentGroupName);
  }

  // Delete a member from the group
  deleteMember(member) {           
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentGroupName)
      .child('members').orderByChild('uid').equalTo(member.uid).once('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.firegroup.child(member.uid).child(this.currentGroupName).remove().then(() => {
            this.enterGroup(this.currentGroupName);
          })
        })
      })
  }
}
