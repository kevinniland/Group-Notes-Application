import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { UtilitiesService } from '../_services/utilities.service';
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Group } from '../_models/group.model';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})

export class NewgroupPage  {
  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private authService: AuthProvider, private router: Router) { 

    }

    ionViewWillEnter(){
      this.authService.checkIfSignedIn();
    }

    groups = [];

    onAddGroup(form) {
      if (form.valid) {

        let profilePicture: string;
        if (form.value.profilePicture == null){
          profilePicture = "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg";
        }
        else {
          profilePicture = form.value.profilePicture;
        }
        
        const group: any = { groupName: form.value.groupName, profilePicture: profilePicture, 
          groupDescription: form.value.groupDescription};

        this.groupService.createGroup(group);

        this.router.navigateByUrl('/home'),
        form.resetForm();
      }
    }
}
