import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../_services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  // users: any = [];
  users = [];

  constructor(private ls: LoginService, public afDatabase: AngularFireDatabase, public http: HttpClient, private authService: AuthProvider) { 
    // this.users = this.afDatabase.list('users');

    console.log(this.users);
  }
  
  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  viewUser(username: string){
    this.authService.viewUserProfile(username);

    console.log(username)
  }
}
