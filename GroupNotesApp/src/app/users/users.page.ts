import { Component, OnInit } from '@angular/core';
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

  // User array - Stores retrieved user data from Firebase
  users = [];

  constructor(public afDatabase: AngularFireDatabase, public http: HttpClient, private authService: AuthProvider) { 
    // this.users = this.afDatabase.list('users');

    console.log(this.users);
  }
  
  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    // Gets all users contained inside the Firebase database and stores the retrieved data to the users array
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
