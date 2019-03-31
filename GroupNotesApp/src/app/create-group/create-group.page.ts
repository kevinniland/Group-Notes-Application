import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { GroupsService } from '../_services/groups.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  constructor(private groupsService: GroupsService) { 

  }

  ngOnInit() {

  }

  newGroup = { groupName: [''] }

  onCreateGroup(form) {
    if (form.valid) {
      this.groupsService.addGroup(form.value.groupName).subscribe();

      console.log(form.value);

      form.resetForm();
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
