import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { GroupsService } from '../_services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage {
  public groups: any = {};

  constructor(private groupservice: GroupsService) { 

  }
}
