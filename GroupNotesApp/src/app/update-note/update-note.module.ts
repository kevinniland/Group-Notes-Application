import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

import { UpdateNotePage } from './update-note.page';

const routes: Routes = [
  {
    path: ':_id',
    component: UpdateNotePage
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
  declarations: [UpdateNotePage]
})
export class UpdateNotePageModule {}
