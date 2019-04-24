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

  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    this.getGroups();
  }

  // Get all groups from firestore database
  getGroups(){
    this.groupService.getAllGroups().subscribe(data =>{
      this.groups = data;
    });
  }

  // Join a selected group
  joinGroup(group: any){
    this.groupService.addUserToGroup(group);
  }

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
