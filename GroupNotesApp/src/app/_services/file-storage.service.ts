import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NotesList } from '../_models/notesList.model';
import { GroupUrl } from '../_models/groupUrl.model';
import { FileUrl } from '../_models/fileUrl.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient, private transfer: FileTransfer, private toastController: ToastController) { }

  // Used to initalise list of download links on mlab using MongoDB
  // These links are used to display the files on the homepage.
  createGroupUrl(groupId: string, urlList: FileUrl[]): Observable<any>{
    const groupUrl: GroupUrl = { groupId: groupId, urlList};
 
    return this.http.post("http://localhost:8081/api/url", groupUrl);
  }

  // Upload a file method, which creates a XMLHttpRequest and posts it to the server
  // I tried using the fileTransfer plugin initally but I couldn't get it working
  // and it has been recently depricated. From research using a XMLHttpRequest is the new supported way.
  uploadFile(file: any, groupId: string): Observable<any> {
    let req = new XMLHttpRequest();
    let formData = new FormData();

    // add file and group id, to be accessed by the server
    formData.append("fileUpload", file);
    formData.append("groupId", groupId);                                      
    req.open("POST", 'http://127.0.0.1:8081/api/files');
    req.send(formData);

    return req.response;
  }

  // == FILES ==
  // Get all files for a specific group from the server
  getFiles(groupId: String):Observable<any>{
    return this.http.get("http://52.51.181.253:3000/api/url/"+groupId);
  }

  //send a delete request to the server, which deletes a note
  deleteFile(_id: string, fileName: string, groupId: string):Observable<any>{
    return this.http.delete("http://52.51.181.253:3000/api/url/" + _id + "/" + fileName + "/" + groupId);
  }

  // == NOTES ==
  // Create a document in the database for a note.
  addNote(groupId: string, fileName: string, dateTime: string, text: string): Observable<any> {
    const note: NotesList = { groupId: groupId, fileName: fileName, dateTime: dateTime, text: text};

    return this.http.post("http://52.51.181.253:3000/api/notes", note);
  }

  // Update a selected note using the id
  updateNote(_id: string, groupId: string, fileName: string, dateTime: string, text: string): Observable<any> {
    const note: NotesList = { groupId: groupId, fileName: fileName, dateTime: dateTime, text: text};

    return this.http.put("http://52.51.181.253:3000/api/notes/"+_id, note);
  }

  //send a delete request to the server, which deletes a note
  deleteNote(_id: string):Observable<any>{
    return this.http.delete("http://52.51.181.253:3000/api/notes/"+_id);
  }

  // Get all notes from the server
  getNotes(groupId: String):Observable<any>{
    return this.http.get("http://52.51.181.253:3000/api/notes/"+groupId);
  }

  // Get one specific note from the server, used when editing the notes
  getNote(_id: String):Observable<any>{
    return this.http.get("http://52.51.181.253:3000/api/note/"+_id);
  }
}
