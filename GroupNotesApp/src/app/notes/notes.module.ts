import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

import { NotesPage } from './notes.page';

const routes: Routes = [
  {
    path: '',
    component: NotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotesPage]
})
export class NotesPageModule {}
