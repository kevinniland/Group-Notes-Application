import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = [];

  constructor(private ls: LoginService) { 

  }

  ngOnInit() {
    this.ls.getUsersData().subscribe(data => {
      this.users = data;
    });
  }

  // Deletes a user from the database
  onDeleteUser(id: string) {
    console.log("User deleted");

     this.ls.deleteUser(id).subscribe(() => {
       // Refreshes page automatically on delete
       this.ngOnInit();
    });
  }
}
