import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NotesList } from '../_models/notesList.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient, private transfer: FileTransfer, private toastController: ToastController) { }

  //add a product (using the interface) to the server
  // uploadFile(base64Image: any)
  // {
  //   console.log("Hello");
  //   console.log(base64Image);
    
  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'test',
  //     fileName: 'imagefile',
  //     chunkedMode: false,
  //     mimeType: "image/jpeg",
  //     headers: {}
  //   }

  //   fileTransfer.upload(base64Image, 'http://127.0.0.1:8081/api/files', options)
  //     .then((data) => {
  //     console.log(data + " File Uploaded.");
  //     //this.presentToast("File uploaded.");
  //   }, (err) => {
  //     console.log(err);
  //     //this.presentToast("Error uploading file");
  //   });
  // }

  // async presentToast(message): Promise<any>{
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'bottom'
  //   });
  //   return toast.present();
  // }

  // presentToast(message) {
  //   const toast = this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }

  //add a product (using the interface) to the server
  // uploadFile(file: any): Observable<any> 
  // {
  //   //var header = { "headers": {"Content-Type": "multipart/form-data"} };

  //   return this.http.post("http://127.0.0.1:8081/api/files", file);
  // }

  //add a product (using the interface) to the server
  uploadFile(file: any) 
  {
    let req = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("fileUpload", file);                                
    req.open("POST", 'http://127.0.0.1:8081/api/files');
    req.send(formData);
  }

  addNote(groupId: string, fileName: string, dateTime: string, text: string): Observable<any> {
    const note: NotesList = { groupId: groupId, fileName: fileName, dateTime: dateTime, text: text};

    return this.http.post("http://localhost:8081/api/notes", note);
  }

  updateNote(_id: string, groupId: string, fileName: string, dateTime: string, text: string): Observable<any> {
    const note: NotesList = { groupId: groupId, fileName: fileName, dateTime: dateTime, text: text};

    return this.http.put("http://localhost:8081/api/notes/"+_id, note);
  }

  //send a delete request to the server, which deletes a note
  deleteNote(_id: string):Observable<any>{
    return this.http.delete("http://localhost:8081/api/notes/"+_id);
  }

  getNotes(groupId: String):Observable<any>{
    return this.http.get("http://localhost:8081/api/notes/"+groupId);
  }

  getNote(_id: String):Observable<any>{
    return this.http.get("http://localhost:8081/api/note/"+_id);
  }
}
