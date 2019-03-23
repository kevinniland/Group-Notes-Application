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
      // this.loginService.getUsersData().subscribe (data => {
      //   this.users = data;

      //   // for loop to iterate through all users
      //   for (var i = 0; i < this.users.length; i++) {
      //     /* if the entered username and password equal a username and password stored in the users array, the user is logged in. localstorage
      //     is used to achieve this. The username and profileImage is set. If username or password is invalid, the user will not be 
      //     logged in */
      //     if (form.value.username == this.users[i].username && form.value.password == this.users[i].password) {
      //       localStorage.setItem ("username", this.users[i].username);
      //       localStorage.setItem ("profileImage", this.users[i].profileImage);
      //     }
      //   } 
      // })
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

  changeSelection (selection: number){
    this.userSelection = selection;
  }
}
