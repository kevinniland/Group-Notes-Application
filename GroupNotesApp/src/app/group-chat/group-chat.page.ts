import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {
  nickname = ' ';

  constructor(public navCtrl: NavController, private socket: Socket) { 

  }

  ngOnInit() {

  }

  onJoinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ChatRoomPage', { nickname: this.nickname });
  }
}
