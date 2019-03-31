import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  groups: any = [];

  constructor(private gs: GroupsService) { 

  }

  ngOnInit() {
    this.gs.getGroupsData().subscribe(data => {
      this.groups = data;
    });
  }

  onCreateGroup(form) {
    if (form.valid) {
      // Commented code moved for time being
    } 
    else {
      return;
    }
  }

  onJoinGroup(form) {
    if (form.valid) {
      
    } 
    else {
      return;
    }
  }

   // Array to store information of groups
  // groups = [];
  // userSelection: number = 0;
  
  /* 
      * To generate a random group ID I have adapted the code from the link below. 
      * Math.random() is not truly random but it takes a lot of iterations to see similarities.
      * It gets a string of seven random letters and numbers.
      * https://stackoverflow.com/a/8084248
      */
    //  let randomGroupId = Math.random().toString(36).substr(2, 7);
    //  console.log(randomGroupId);

     //const urlList: FileUrl[] = [];

     //Code for setting up list of download urls, it will create a new document on the database for each new group
     // this.storageService.createGroupUrl(groupId, urlList).subscribe(res =>
     // {
       // if (res.msg == "Group Url Added"){
       //   this.utilitiesService.presentToast("Note updated successfully!");
       // }
       // else{
       //   this.utilitiesService.presentToast("Error updating note please try again!");
       // }
     //});
  onSelectionChange (selection: number){
    //this.userSelection = selection;
  }
}
