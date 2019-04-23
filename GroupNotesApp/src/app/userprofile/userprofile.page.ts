import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})

export class UserprofilePage implements OnInit {
  mainUser: AngularFirestoreDocument
  sub
	group
	username: string
	profilePic: string

	constructor(private afs: AngularFirestore, private authService: AuthProvider, private router: Router) {
		// this.mainUser = afs.doc(`users/${authService.getUID()}`)
		this.sub = this.mainUser.valueChanges().subscribe(event => {
			this.group = event.group
			this.username = event.username
			this.profilePic = event.profilePic
		})
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	ngOnInit() {

	}
}
