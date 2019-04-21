import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { UtilitiesService } from '../_services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})
export class NewgroupPage  {
  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private router: Router) { 

    }

    groups = { groupName: '' };

    onAddGroup(form) {
      if (form.valid) {
        const group: Group = { groupName: form.value.groupName };
  
        this.groupService.createGroup(group).then(
          () => {
            this.utilitiesService.presentToast("Creation of group successful, you have created a new group"),
            this.utilitiesService.presentLoadingWithOptions(),
            localStorage.setItem ("groupName", group.groupName)
            this.router.navigateByUrl('/home'),
            form.resetForm();
          },
          error => this.utilitiesService.presentToast(error.message + " Please try again!")
        );
  
      }
    }
}
