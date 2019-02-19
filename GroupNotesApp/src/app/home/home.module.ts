import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor(private camera: Camera) {}

  base64Image;

  //open the camera on mobile devices to take a picture, 
  //this will allow the user to crop it to a 1:1 aspect ration (Square) and then save it for testing
  openCamera(){
    const options: CameraOptions = {
      quality: 75,
      allowEdit : true,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    //get the picture taken and store it as a base64 image.
    this.camera.getPicture(options).then((imageData) => {

     // imageData is either a base64 encoded string or a file URI
     this.base64Image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log("Error");
    });
  }
}
