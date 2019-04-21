import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { UtilitiesService } from '../_services/utilities.service';
import { Router } from '@angular/router';
import { Group } from '../_models/group.model';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})

export class NewgroupPage  {
  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, private router: Router) { 

    }

    groups = { groupName: '' };

    onAddGroup(form) {
      if (form.valid) {
        const group: Group = { groupId: form.value.groupId, groupName: form.value.groupName };
  
        // this.groupService.createGroup(group).then(
        //   () => {
        //     localStorage.setItem ("groupName", group.groupName)
        //     this.router.navigateByUrl('/home'),
        //     form.resetForm();
        //   },

        //   error => this.utilitiesService.presentToast(error.message + " Please try again!")
        // );

        localStorage.setItem ("groupName", group.groupName)
        this.router.navigateByUrl('/home'),
        form.resetForm();

        console.log("Group added")
      }
    }
}
