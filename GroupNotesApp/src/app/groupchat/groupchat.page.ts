import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../_services/auth.service';
import { GroupsService } from '../_services/groups.service';
import { UtilitiesService } from '../_services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private authService: AuthProvider, private router: Router, public http: HttpClient, 
    private route: ActivatedRoute) { 

  }

  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  post: any;
  chats = [];

  ngOnInit() {
    this.groupService.getGroupChats(this.route.snapshot.params['groupId']).subscribe(data => {
      this.chats = data.messages;
      console.log(this.chats);
    });
  }

  onSendChat(form) {
    if (form.valid){
      const date = new Date();
      
      const groupChat: any = { post: form.value.post, dateTime: date.toLocaleString(), groupId: this.route.snapshot.params['groupId']};

      console.log(groupChat);

      this.groupService.sendMessage(groupChat);

      this.utilitiesService.presentToast("Message sent successfully!"),
      this.router.navigateByUrl('/groupchat'),
      form.resetForm();

      console.log("Chat added")
    }
  }
}
