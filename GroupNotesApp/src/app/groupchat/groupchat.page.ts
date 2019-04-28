import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../_services/auth.service';
import { GroupsService } from '../_services/groups.service';
import { UtilitiesService } from '../_services/utilities.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  constructor(private groupService: GroupsService, private utilitiesService: UtilitiesService, 
    private authService: AuthProvider, private router: Router, public http: HttpClient) { 

  }

  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  groupChat = [];
  chats = [];

  ngOnInit() {
    this.groupService.getAllGroupChats().subscribe(data => {
      this.chats = data;
      console.log(this.chats);
    });
  }

  onSendChat(form) {
    if (form.valid) {
      const groupChat: any = { post: form.value.post, username: form.value.username };

      this.groupService.createChatPost(groupChat);

      this.utilitiesService.presentToast("Chat sent successfully!"),
        this.router.navigateByUrl('/groupchat'),
        form.resetForm();

        console.log("Chat added")
    }
  }
}
