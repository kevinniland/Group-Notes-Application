import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient, private transfer: FileTransfer) { }

  //add a product (using the interface) to the server
  uploadFile(base64Image: string)
  {
    //const fileTransfer: FileTransferObject = this.transfer.create();


  }

  //add a product (using the interface) to the server
  // uploadFile(base64Image: string): Observable<any> 
  // {
  //   console.log("Hello");
  //   return this.http.post("http://127.0.0.1:8081/api/files", base64Image);
  // }
}
