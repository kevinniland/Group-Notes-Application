import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../_services/file-storage.service';
import {Router} from '@angular/router'
import { ToastController } from '@ionic/angular';

//import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(private storageService: FileStorageService, private router: Router, 
    public toastController: ToastController /*private h: HomePage */) { }

  textModel = "<h2>An Unordered HTML List</h2><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul><h2>An Ordered HTML List</h2>"
  fileName : string;
  
  //testModel = '';

  ngOnInit() {
    
  }

  addNote(){
    //will complete
    console.log(this.textModel);
    
    let groupId : string = "12345";

    this.storageService.addNote(groupId, this.fileName, "06-03-19", this.textModel).subscribe();

    //this.presentToast("Note added successfully");

    //this.h.ionViewWillEnter();

    this.router.navigateByUrl('/home');
  }

  // presentToast(message) {
  //   const toast = this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'bottom',
  //     showCloseButton: true,
  //     closeButtonText: 'Done'
  //   });
  //   toast.present();
  // }
}
