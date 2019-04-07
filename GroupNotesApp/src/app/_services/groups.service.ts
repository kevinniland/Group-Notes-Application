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

  addGroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        messageBoard: '',
        owner: firebase.auth().currentUser.uid
      }).then(() => {
        resolve(true);
        }).catch((err) => {
          reject(err);
      })
    });

    return promise;
  }

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
}
