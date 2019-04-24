import { Component, OnInit} from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-image-popover',
  templateUrl: './image-popover.component.html',
  styleUrls: ['./image-popover.component.scss']
})

export class ImagePopoverComponent implements OnInit {
  file: any;

  constructor(public navParams: NavParams, private platform: Platform, private transfer: FileTransfer,) { 
      // Get the value passed by the popover controller
      this.file = this.navParams.get('file');
  }

  ngOnInit() {

  }

  // Download the image
  download(){
    this.platform.ready().then(() => {
      // If mobile, download to device
      if (this.platform.is('mobile')) {
        const fileTransfer: FileTransferObject = this.transfer.create();

        fileTransfer.download(this.file.url, this.file.externalRootDirectory + '/Download/' + this.file.fileName).then((entry) => {
          alert("Success");
        }, (error) => {
          alert("Error");
        });
      }
      else {
        // Open image in browser
        window.location.assign(this.file.url);
      }
   });
  }
}
