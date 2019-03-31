import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../_models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient) { 

  }

  // Adds a group
  addGroup(groupName: string): Observable<any> {
    const group: Group = { groupName: groupName};

    return this.http.post("http://localhost:8081/api/groups", group);
  }

  // Gets group's data
  getGroupsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/groups");
  }

  // Gets user's data - Unlike the above method, it also returns the id of the user
  getGroup(id: string): Observable<any> {
    return this.http.get("http://localhost:8081/api/groups/" + id);
  }
}
