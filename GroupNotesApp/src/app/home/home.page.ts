import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { FileStorageService } from '../_services/file-storage.service';
import { UtilitiesService } from '../_services/utilities.service';
import { GroupsService } from '../_services/groups.service';
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  constructor(private camera: Camera, private storageService: FileStorageService, 
    private utilitiesService: UtilitiesService, private authService: AuthProvider, private router: Router, 
    public actionSheetController: ActionSheetController, private groupService: GroupsService,) {}

  // Global variables
  file;
  files: any[] = []; // List of files
  fileImage: any = []; // List of dynamic file images
  notes: any[] = []; // List of notes
  searchWord: string = ""; // Used to search notes/files
  selection = 1; // Wheter notes or files is selected
  groupId : string; // Used to load specific group
  groupName: string; // used to display current group on homepage
  groups = []; // List of current groups a user is in

  // == LOAD DATA METHODS == 
  ionViewWillEnter(){
    // Check if the user is logged in, if not go to log in page 
    this.authService.checkIfSignedIn();
    this.groupId = localStorage.getItem("groupId");
    this.groupName = localStorage.getItem("groupName");
    this.loadGroups();
  }

  // Get the list of groups the user is in
  loadGroups(){
    this.authService.getSignedInUserDetails().subscribe(data =>{
      this.groups = data.groupsArray;
      this.getFiles();
      this.getNotes();
    });
  }

  // Change the selected group, when a card is clicked on
  loadGroup(groupId: string, groupName: string){
    // Set values in local storage which is how the current group and group name are read
    localStorage.setItem ("groupId", groupId);
    this.groupId = localStorage.getItem("groupId");

    localStorage.setItem ("groupName", groupName);
    this.groupName = localStorage.getItem("groupName");

    this.utilitiesService.presentToast("Loading group " + groupName + "!");
    this.getFiles();
    this.getNotes();
  }

  // Get the list of files for the selected group from the MongoDB database
  getFiles(){
    this.storageService.getFiles(this.groupId).subscribe(data =>{
      if (data != null){
        this.files = data[0].urlList;
        this.loadImages();
      }
    });
  }

  // Get the list of notes for the selected group from the database
  getNotes(){
    this.storageService.getNotes(this.groupId).subscribe(data =>{
      if (data != null){
        this.notes = data;
      }
    });
  }

  // Load image links into array to be displayed on homepage.
  // Each image is displayed depending on the file type. E.g a PDF file gets the PDF image I designed.
  loadImages(){
    //loop through each file
    for (var i = 0; i < this.files.length; i++) {

      //depending on file type set the image to be displayed
      if (this.files[i].type.substr(0,5) == "image") { 
        this.fileImage[i] = "https://github.com/MatthewSloyan/IT-Professional-Skills-Group-Project/blob/master/Images/imageIcon.jpg?raw=true";
      } 
      else if (this.files[i].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        this.fileImage[i] = "https://github.com/MatthewSloyan/IT-Professional-Skills-Group-Project/blob/master/Images/wordIcon.jpg?raw=true";
      }
      else if (this.files[i].type == "application/pdf") {
        this.fileImage[i] = "https://github.com/MatthewSloyan/IT-Professional-Skills-Group-Project/blob/master/Images/pdfIcon.jpg?raw=true";
      }
      else {
        this.fileImage[i] = "https://github.com/MatthewSloyan/IT-Professional-Skills-Group-Project/blob/master/Images/standardIcon.jpg?raw=true";
      }
    }
  }

  // == USER FUNCTIONALITY == 

  // Click on the hidden file input to open file viewer, this was the only way that would work 
  // to implement this accross all platforms.
  addFile(){
    var x = document.getElementById("myFile").click();
  }

  // When the file is selected from the viewer.
  changeListener($event) : void {
    // Get the file from the event handler
    this.file = $event.target.files[0];

    this.utilitiesService.presentLoadingWithOptions();

    // Send file to server and upload to google cloud and add the download link to the Mongo document which is updated below.
    var res = this.storageService.uploadFile(this.file, this.groupId);

    // Finally figured out how to implement the automatic list update on delete, add etc.
    // When implemented the pull to refresh functionality I found that there is a timeout functionality 
    // which waits half a second and then reloads the list. This gives the database time to update above
    // so it's not just returing the same data.
    setTimeout(() => {
      this.getFiles();
    }, 700);
  }

  // Delete note from database, and update list
  deleteNote(slidingItem: any, _id: string) {
    // On all button presses the slider needs to be closed or else it will lock the slider functionality.
    slidingItem.close(); 

    // Delete note document on MongoDB
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

  // Delete file from database, and update list
  deleteFile(slidingItem: any, file: any) {
    slidingItem.close();

    // This deletes from both Google Cloud and Mongo document.
    this.storageService.deleteFile(file._id, file.fileName, this.groupId).subscribe(res => 
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
  
  //to fix known bug where the sliding items don't work after the list is updated, 
  //I have implemented a function that closes this list first which seems to work.
  closeSlider(slidingItem: any) {
    slidingItem.close(); // <-- this is the important bit!
  }

  // On click either display the image, or download the file.
  downloadFile(url: string, type: string, fileName){
    this.storageService.downloadViewFile(url, type, fileName);
  }

  // I tried to implement camera functionality where the user would be able to take a picture, and it would be 
  // saved to the database however I couldn't get it working despite trying various things so I am going to have to leave it out for now.
  // Attempts can be found below, and link to helpful implemtation that sadly didn't work.
  // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f/38935990

  // Open the camera on mobile devices to take a picture, 
  // this will allow the user to crop it to a 1:1 aspect ration (Square) and then save it for testing
  // openCamera(){
  //   const options: CameraOptions = {
  //     quality: 100,
  //     //allowEdit : true,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   }
    
  //   // Get the picture taken and store it as a base64 image.
  //   this.camera.getPicture(options).then((imageData) => {

  //     // imageData is either a base64 encoded string or a file URI
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;

  //     //Usage example:
  //     //var file = this.dataURLtoFile(base64Image, 'Sample.jpeg');
  //     //console.log(file);

  //     this.urltoFile(base64Image, 'Sample.jpeg', 'image/jpeg')
  //     .then(function(file){
  //         alert(file);
  //         this.storageService.uploadFile(file, this.groupId);
  //     })

  //     //this.utilitiesService.presentToast(imageData);
  //   }, (err) => {
  //     this.utilitiesService.presentToast("Error opening camera, please try again.");
  //   });
  // }

  // urltoFile(url, filename, mimeType){
  //   return (fetch(url)
  //       .then(function(res){return res.arrayBuffer();})
  //       .then(function(buf){return new File([buf], filename, {type:mimeType});})
  //   );
  // }

  // == UI METHODS == 

  // I decided to implement an action sheet to improve user experience so they can easily add a file, picture or note.
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select an option',
      buttons: [ /*{
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, */{
        text: 'Add File',
        icon: 'folder',
        handler: () => {
          this.addFile();
        }
      }, {
        text: 'Add Note',
        icon: 'document',
        handler: () => {
          this.router.navigateByUrl('/update-note/new');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  // Handle refresh of current selection (Notes/Files) to limit server calls.
  doRefresh(event) {

    setTimeout(() => {
      //Reload files and notes
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  // From research online I found that Typescript has an implemented filter method for arrays,
  // which creats a new array based on the string passed in.
  // https://www.tutorialspoint.com/typescript/typescript_array_filter.htm
  // I have also converted the title and search string to lower case so it finds all files.
  filteredFiles(){
    this.files = this.files.filter(file => {
      return file.fileName.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
    });

    // Reload images to update them
    this.loadImages();
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
