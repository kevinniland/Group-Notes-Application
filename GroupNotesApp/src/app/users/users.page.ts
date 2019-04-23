import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  // users: any = [];
  usersRef : Observable<any>;

  constructor(private ls: LoginService, public afDatabase: AngularFireDatabase, public http: HttpClient) { 
    this.usersRef = this.afDatabase.list('users').valueChanges();

    console.log(this.usersRef);
  }

  ngOnInit() {
    // this.ls.getUsersData().subscribe(data => {
    //   this.users = data;
    // });
  }

  // getDataFromDatabase() {
  //   this.afd.list('users/').valueChanges().subscribe(
  //     data => {
  //       console.log(data);
  //       this.users = data;
  //     }
  //   )
  // }
  // // Deletes a user from the database
  // onDeleteUser(id: string) {
  //   console.log("User deleted");

  //    this.ls.deleteUser(id).subscribe(() => {
  //      // Refreshes page automatically on delete
  //      this.ngOnInit();
  //   });
  // }
}
