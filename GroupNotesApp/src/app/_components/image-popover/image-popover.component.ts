import { Component, OnInit} from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image-popover',
  templateUrl: './image-popover.component.html',
  styleUrls: ['./image-popover.component.scss']
})

export class ImagePopoverComponent implements OnInit {
  imageUrl: string;

  constructor(public navParams: NavParams) { 
      // Get the value passed by the popover controller
      this.imageUrl = this.navParams.get('url');
  }

  ngOnInit() {

  }

  // Download the image
  download() { 

  }
}
