import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  constructor() { }

  // Array to store information of groups
  group = [];
  userSelection: number = 0;

  ngOnInit() {
    
  }

  onCreateGroup(form) {
    if (form.valid) {
      // To generate a random group ID I have adapted the code from the link below. 
      // Math.random() is not truly random but it takes a lot of iterations to see similarities.
      // It gets a string of seven random letters and numbers.
      // https://stackoverflow.com/a/8084248
      let randomGroupId = Math.random().toString(36).substr(2, 7);
      console.log(randomGroupId);

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
  
  onSelectionChange (selection: number){
    this.userSelection = selection;
  }
}
