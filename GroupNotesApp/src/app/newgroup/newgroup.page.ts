import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsService } from '../_services/groups.service';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})

export class NewgroupPage implements OnInit {
  newgroup = {
    groupName: 'Enter Group Name'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public groupservice: GroupsService, public loadingCtrl: LoadingController) {

   }

  ngOnInit() {

  }

  creategroup() {
    this.groupservice.addGroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    })
  }

  editgroupname() {
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Enter new group name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Set',
        handler: data => {
          if (data.groupname) {
            this.newgroup.groupName = data.groupname
          } else {
            this.newgroup.groupName = 'Edit group name';
          }
        }
      }
      ]
    });
    alert.present();
  }
}
