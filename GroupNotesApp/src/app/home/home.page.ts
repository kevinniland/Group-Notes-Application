import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
//import { FileChooser } from '@ionic-native/file-chooser';
import { FileStorageService } from '../_services/file-storage.service';
import { UtilitiesService } from '../_services/utilities.service';
import { FileUrl } from '../_models/fileUrl.model';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  constructor(private camera: Camera, private chooser: Chooser, private storageService: FileStorageService, 
    private utilitiesService: UtilitiesService, private ref: ChangeDetectorRef) {}

  base64Image;
  file;
  files: any[] = [];
  notes: any[] = [];
  searchWord: string = "";
  selection = 1;
  groupId : string = "12345";

  ionViewWillEnter(){
    this.getFiles();
    this.getNotes();
  }

  // Get the list of files for the selected group from the database
  getFiles(){
    this.files

    this.storageService.getFiles(this.groupId).subscribe(data =>{
      this.files = data[0].urlList;
    });
  }

  // Get the list of notes for the selected group from the database
  getNotes(){
    this.storageService.getNotes(this.groupId).subscribe(data =>{
      this.notes = data;
    });
  }

  // Handle refresh of current selection (Notes/Files) to limit server calls.
  doRefresh(event) {

    setTimeout(() => {
      if (this.selection == 1){
        this.getNotes();
      }
      else {
        this.getFiles();
      }
      event.target.complete();
    }, 1000);
  }

  // Open the camera on mobile devices to take a picture, 
  // this will allow the user to crop it to a 1:1 aspect ration (Square) and then save it for testing
  openCamera(){
    console.log("Hello");
    const options: CameraOptions = {
      quality: 75,
      allowEdit : true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    // Get the picture taken and store it as a base64 image.
    this.camera.getPicture(options).then((imageData) => {

      // imageData is either a base64 encoded string or a file URI
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      //this.service.uploadFile(this.base64Image).subscribe();
      //this.service.uploadFile(this.file).subscribe();
    }, (err) => {
      console.log("Error");
    });
  }

  addFile(){
    var x = document.getElementById("myFile").click();
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    let groupId : string = "12345";

    this.utilitiesService.presentLoadingWithOptions();

    this.storageService.uploadFile(this.file, groupId).subscribe(res =>
    {
      if (res.msg == "Error"){
        this.utilitiesService.presentToast("Error uploading file, please try again.");
      }
      else{
        this.utilitiesService.presentToast("File uploaded successfully!");
        
      }
      this.getFiles();
    });
  }

  async deleteNote(slidingItem: any, _id: string) {
    // On all button presses the slider needs to be closed or else it will lock the slider functionality.
    slidingItem.close(); 

    await this.storageService.deleteNote(_id).subscribe(res => 
    {
      if (res.msg != "Error"){
        this.utilitiesService.presentToast("Error deleting note, please try again!");
      }
    });

    this.notes = null;
    await this.getNotes();
  }

  async deleteFile(slidingItem: any, file: any) {
    slidingItem.close();

    let groupId : string = "12345";

    await this.storageService.deleteFile(file._id, file.fileName, groupId).subscribe(res => 
    {
      if (res.msg != "Error"){
        this.utilitiesService.presentToast("Error deleting file, please try again!");
      }
    });
    
    this.files = null;
    this.getFiles();
  }

  downloadFile(url: string, type: string){

    //get the file extension if image
    var res = type.substring(type.length - 3, type.length);

    if (res == 'png' || res == 'jpg' || res == 'pdf'){

    }
    else {
      // Open the download link in the current window.
      window.location.assign(url);
    }

    // Will fully implement for different types as for images it opens a new page in the current
  }

  //to fix known bug where the sliding items don't work after the list is updated, 
  //I have implemented a function that closes this list first which seems to work.
  closeSlider(slidingItem: any) {
    slidingItem.close(); // <-- this is the important bit!
  }

  // From research online I found that Typescript has an implemented filter method for arrays,
  // which creats a new array based on the string passed in.
  // https://www.tutorialspoint.com/typescript/typescript_array_filter.htm
  // I have also converted the title and search string to lower case so it finds all files.
  filteredFiles(){
    this.files = this.files.filter(file => {
      return file.fileName.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
    });
  }

  filteredNotes(){
    this.notes = this.notes.filter(note => {
      return note.fileName.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
    });
  }

  // If the search query is cancelled reload notes or files
  onCancelFiles(){
    this.getFiles();
  }

  onCancelNotes(){
    this.getNotes();
  }
}
