import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../_services/file-storage.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(private storageService: FileStorageService, private router: Router) { }

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

    this.router.navigateByUrl('/home');
  }
}
