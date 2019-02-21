import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient) { }

  //add a product (using the interface) to the server
  uploadFile(base64Image: string): Observable<any> 
  {
    return this.http.post("http://127.0.0.1:8081/api/files", base64Image);
  }
}
