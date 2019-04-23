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
    
  // Gets user's data
  getUsersData(): Observable<any> {
    return this.http.get("http://52.51.181.253:3000/api/users");
  }

  // Gets user's data - Unlike the above method, it also returns the id of the user
  getUser(id: string): Observable<any> {
    return this.http.get("http://52.51.181.253:3000/api/users/" + id);
  }

  // Delete a user
  deleteUser(id: string):Observable<any>{
    return this.http.delete("http://52.51.181.253:3000/api/users/" + id);
  }
}
