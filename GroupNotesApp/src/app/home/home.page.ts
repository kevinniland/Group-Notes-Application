import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
//import { FileChooser } from '@ionic-native/file-chooser';
import { FileStorageService } from '../_services/file-storage.service';
import { UtilitiesService } from '../_services/utilities.service';
import { FileUrl } from '../_models/fileUrl.model';
import { PopoverController } from '@ionic/angular';
import { ImagePopoverComponent } from '../_components/image-popover/image-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  constructor(private camera: Camera, private chooser: Chooser, private storageService: FileStorageService, 
    private utilitiesService: UtilitiesService, public popoverController: PopoverController) {}

  // Global variables
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
      //Reload files and notes
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }

  // Open the camera on mobile devices to take a picture, 
  // this will allow the user to crop it to a 1:1 aspect ration (Square) and then save it for testing
  openCamera(){
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
      this.utilitiesService.presentToast("Error opening camera, please try again.");
    });
  }

  // Click on the hidden file input to open file viewer
  addFile(){
    var x = document.getElementById("myFile").click();
  }

  changeListener($event) : void {
    // Get the file from the event handler
    this.file = $event.target.files[0];
    let groupId : string = "12345";

    this.utilitiesService.presentLoadingWithOptions();

    var res = this.storageService.uploadFile(this.file, groupId);

    // Finally figured out how to implement the automatic list update on delete, add etc.
    // When implemented the pull to refresh functionality I found that there is a timeout functionality 
    // which waits half a second and then reloads the list. This gives the database time to update above
    // so it's not just returing the same data.
    setTimeout(() => {
      this.getFiles();
    }, 500);
  }

  deleteNote(slidingItem: any, _id: string) {
    // On all button presses the slider needs to be closed or else it will lock the slider functionality.
    slidingItem.close(); 

    this.storageService.deleteNote(_id).subscribe(res => 
    {
      if (res.msg != "Error"){
        this.utilitiesService.presentToast("Error deleting note, please try again!");
      }
    });

    // Wait and refresh the list
    setTimeout(() => {
      this.getNotes();
    }, 500);
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

    // Wait and refresh the list
    setTimeout(() => {
      this.getFiles();
    }, 500);
  }

  downloadFile(url: string, type: string){

    //get the file extension if image
    var res = type.substring(type.length - 3, type.length);

    if (res == 'png' || res == 'jpg' || res == 'pdf'){
      this.presentPopover(event);
    }
    else {
      // Open the download link in the current window.
      window.location.assign(url);
    }

    // Will fully implement for different types as for images it opens a new page in the current
  }

  // Load popover for images
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
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
