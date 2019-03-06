import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor() { }

  testModel = "<h2>An Unordered HTML List</h2><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul><h2>An Ordered HTML List</h2>"
  
  //testModel = '';

  ngOnInit() {
    
  }

  addNote(){
    //will complete
    console.log(this.testModel);
  }

}
