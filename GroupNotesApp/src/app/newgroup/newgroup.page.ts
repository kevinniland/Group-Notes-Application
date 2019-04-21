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

    groups: any;

    onAddGroup(form) {
      if (form.valid) {
        const group: any = { groupName: form.value.groupName, profilePicture: form.value.profilePicture};

        this.groupService.createGroup(group).then(
          () => {
            this.utilitiesService.presentToast("Group created successfully!"),
            this.router.navigateByUrl('/home'),
            form.resetForm();
          },
          error => this.utilitiesService.presentToast(error.message + " Please try again!")
        );

        // localStorage.setItem ("groupName", group.groupName)
        // this.router.navigateByUrl('/home'),
        // form.resetForm();

        console.log("Group added")
      }
    }
}
