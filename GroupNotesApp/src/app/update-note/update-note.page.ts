import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../_services/file-storage.service';
import { UtilitiesService } from '../_services/utilities.service';
import { AuthProvider } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {

  constructor(private storageService: FileStorageService, private utilitiesService: UtilitiesService,
    private router: Router, private route: ActivatedRoute, private authService: AuthProvider) { }

  titleName: string;
  note: any = [];
  fileName: string;
  textModel: string; // HTML text entered into text editor.

  // Check if the user is signed in using Firebase, if not load log in page.
  ionViewWillEnter(){
    this.authService.checkIfSignedIn();
  }

  ngOnInit() {
    // As both creating and editing a note are similar pages, I decided to implement them as one to cut down code.

    // if it's a new note, initalise variables
    if (this.route.snapshot.params['_id'] == "new"){
      this.fileName = "";
      this.textModel = "";
      this.titleName = "New Note"
    }
    else {
      // try to get note data from the passed in id, this will be loaded into the text editor
      this.storageService.getNote(this.route.snapshot.params['_id']).subscribe(data =>
      {
        if (data.msg == "Error") {
          this.utilitiesService.presentToast("Error loading note, please try again");
          this.router.navigateByUrl('/home');
        }
        else {
          // Load saved note into view
          this.note = data;
          this.fileName = data.fileName;
          this.textModel = data.text;
          this.titleName = "Updating " + data.fileName;
        }
      })
    }
  }

  // Either update the note or save new note to mongo document.
  updateAddNote() {
    const date = new Date();

    //if it's a new note
    if (this.route.snapshot.params['_id'] == "new") {
      let groupId : string = localStorage.getItem("groupId");

      this.storageService.addNote(groupId, this.fileName, 
        date.toLocaleString(), this.textModel).subscribe(res => {
        if (res.msg == "Note Added") {
          this.utilitiesService.presentToast("Note added successfully!");
        }
        else {
          this.utilitiesService.presentToast("Error adding note please try again!");
        }
      });
    }
    //else it's a note to be updated
    else {
      this.storageService.updateNote(this.note._id, this.note.groupId, this.fileName, 
        date.toLocaleString(), this.textModel).subscribe(res => {
        if (res.msg == "Note Updated"){
          this.utilitiesService.presentToast("Note updated successfully!");
        }
        else {
          this.utilitiesService.presentToast("Error updating note please try again!");
        }
      });
    }

    // Wait and load home page
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 500);
  }
}
