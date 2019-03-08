import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../_services/file-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {

  constructor(private storageService: FileStorageService, private router: Router, 
    private route: ActivatedRoute, public toastController: ToastController) { }

  note: any = [];
  fileName: string;
  textModel: string;

  ngOnInit() {
    //if it's a new note, initalise variables
    if (this.route.snapshot.params['_id'] == "new"){
      this.fileName = "";
      this.textModel = "";
    }
    else {
      //try to get note data from the passed in id, this will be loaded into the text editor
      this.storageService.getNote(this.route.snapshot.params['_id']).subscribe(data =>
      {
        if (data.msg == "Error"){
          this.presentToast("Error loading note, please try again");
          this.router.navigateByUrl('/home');
        }
        else{
          this.note = data;
          this.fileName = data.fileName;
          this.textModel = data.text;
        }
      })
    }
  }

  updateAddNote(){
    const date = new Date();

    //if it's a new note
    if (this.route.snapshot.params['_id'] == "new"){
      let groupId : string = "12345";

      this.storageService.addNote(groupId, this.fileName, 
        date.toLocaleString(), this.textModel).subscribe(res =>
      {
        if (res.msg == "Note Added"){
          this.presentToast("Note added successfully!");
        }
        else{
          this.presentToast("Error adding note please try again!");
        }
      });
    }
    //else it's a note to be updated
    else {
      this.storageService.updateNote(this.note._id, this.note.groupId, this.fileName, 
        date.toLocaleString(), this.textModel).subscribe(res =>
      {
        if (res.msg == "Note Updated"){
          this.presentToast("Note updated successfully!");
        }
        else{
          this.presentToast("Error updating note please try again!");
        }
      });
    }
    //this.h.ionViewWillEnter();

    this.router.navigateByUrl('/home');
  }

  //present toast message that will handle either a success or failure
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }
}
