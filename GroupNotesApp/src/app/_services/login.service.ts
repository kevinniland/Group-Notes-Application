import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { 

  }

  // Adds a user
  addUser(username: string, password: string, email: string, firstName: string, lastName: string, 
    profileImage: string): Observable<any> {
    const user: User = { username: username, password: password, email: email, firstName: firstName, lastName: lastName, 
      profileImage: profileImage };

      return this.http.post("http://localhost:8081/api/users", user);
    }

    // TODO: updateUser, deleteUser

    // Gets user's data
    getUsersData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/users");
    }
  }
