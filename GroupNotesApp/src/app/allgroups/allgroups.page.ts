import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { app } from 'firebase';

@Component({
  selector: 'app-allgroups',
  templateUrl: './allgroups.page.html',
  styleUrls: ['./allgroups.page.scss'],
})
export class AllgroupsPage implements OnInit {
  myGroup = {};

  constructor() { 

  }

  ngOnInit() {
  //   const groupRef: firebase.database.Reference = firebase.database().ref(`/group/`);

  //   groupRef.on('value', groupSnapshot => {
  //     this.myGroup = groupSnapshot.val();
  //   });
  }
}
