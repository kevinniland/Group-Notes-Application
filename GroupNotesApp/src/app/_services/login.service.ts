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
    /*profileImage: string*/): Observable<any> {
    const user: User = { username: username, password: password, email: email, firstName: firstName, lastName: lastName, 
      /*profileImage: profileImage*/ };

      return this.http.post("http://localhost:8081/api/users", user);
    }
    
  // Gets user's data
  getUsersData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/users");
  }

    // Gets user's data - Unlike the above method, it also returns the id of the user
  getUser(id: string): Observable<any> {
    return this.http.get("http://localhost:8081/api/users/" + id);
  }

  // Delete a user
  deleteUser(id: string):Observable<any>{
    return this.http.delete("http://localhost:8081/api/users/" + id);
  }

  // Update a user
}
