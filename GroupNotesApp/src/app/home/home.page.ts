import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
//import { FileChooser } from '@ionic-native/file-chooser';
import { FileStorageService } from '../_services/file-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})
export class HomePage {
  constructor(private camera: Camera, private chooser: Chooser, private service: FileStorageService) {}

  base64Image;
  file;

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

      this.service.uploadFile(this.base64Image).subscribe();
      //this.service.uploadFile(this.file).subscribe();
    }, (err) => {
      console.log("Error");
    });
  }

  addFile(){
    console.log("Hello");

    var x = document.getElementById("myFile").click();

    //console.log(x);

    // this.chooser.getFile('image/jpeg')
    //   .then(file => console.log(file ? file.name : 'canceled'))
    //   .catch((error: any) => console.error(error));
    
    // const file = this.chooser.getFile('image/.jpg');
    // console.log(file ? file.name : 'canceled');
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    console.log(this.file);

    this.service.uploadFile(this.file).subscribe();

    //document.getElementById("fileButton").click();

    // (<HTMLInputElement>document.getElementById("myFile")).submit();

    // var inputElement = <HTMLInputElement>document.getElementById('submitForm').submit();

    // let req = new XMLHttpRequest();
    // let formData = new FormData();

    // formData.append("file", this.file);                                
    // req.open("POST", 'http://127.0.0.1:8081/api/files');
    // req.send(formData);
  }
}
