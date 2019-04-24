import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { AuthProvider } from '../_services/auth.service';
import { UtilitiesService } from '../_services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allgroups',
  templateUrl: './allgroups.page.html',
  styleUrls: ['./allgroups.page.scss'],
})

export class AllgroupsPage implements OnInit {
  groups = [];

  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private authService: AuthProvider, private router: Router) { 

  }

  searchWord: string = "";

  // Check if the user is signed in, if not go to loggin page. Acts as a route guard.
  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    // Load groups
    this.getGroups();
  }

  // Get all groups from firestore database
  getGroups(){
    this.groupService.getAllGroups().subscribe(data =>{
      this.groups = data;
    });
  }

  // Join a selected group, which checks if the user is already in a group.
  joinGroup(group: any){
    this.groupService.addUserToGroup(group);
  }

  // From research online I found that Typescript has an implemented filter method for arrays,
  // which creats a new array based on the string passed in.
  // https://www.tutorialspoint.com/typescript/typescript_array_filter.htm
  // I have also converted the title and search string to lower case so it finds all files.
  filteredGroups(){
    this.groups = this.groups.filter(group => {
      return group.groupName.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
    });
  }

  // If the search query is cancelled reload groups
  onCancelGroups(){
    this.getGroups();
  }
}
