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
  
  myGroups = [];

  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private authService: AuthProvider, private router: Router) { 

  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(data =>{
      this.myGroups = data;
      console.log(this.myGroups);
    });
  }
}
