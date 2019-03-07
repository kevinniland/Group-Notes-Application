import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../_services/file-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {

  constructor(private storageService: FileStorageService, private router: Router, private route: ActivatedRoute) { }

  note: any = [];
  fileName : string;

  ngOnInit() {
    this.storageService.getNote(this.route.snapshot.params['_id']).subscribe(data =>
    {
      this.note = data;
    })
  }

  updateNote(groupId: string){
    //will complete

    this.storageService.updateNote(this.note._id, this.note.groupId, this.note.fileName, "06-03-19", this.note.text).subscribe();

    //this.presentToast("Note added successfully");

    //this.h.ionViewWillEnter();

    this.router.navigateByUrl('/home');
  }
}
