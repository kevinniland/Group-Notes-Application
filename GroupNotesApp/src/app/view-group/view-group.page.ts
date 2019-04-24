import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { AuthProvider } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.page.html',
  styleUrls: ['./view-group.page.scss'],
})
export class ViewGroupPage implements OnInit {

  constructor(private groupService: GroupsService,
    private authService: AuthProvider, private router: Router, private route: ActivatedRoute) { }

  group: any;

  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    this.groupService.getGroup(this.route.snapshot.params['groupId']).subscribe(data => {
      this.group = data;
    });
  }
}
