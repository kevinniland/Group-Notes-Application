import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { GrouptabsPage } from './grouptabs.page';
import { pathMatch } from 'tough-cookie';
// import { GroupchatPage } from '../groupchat/groupchat.page';
// import { GroupmembersPage } from '../groupmembers/groupmembers.page';
// import { GroupsPage } from '../groups/groups.page';

const routes: Routes = [
  { path: 'grouptabs', component: GrouptabsPage,
    children: [
      {
        path: 'groupchat',
        children: [
          {
            path: 'tab1',
            children:
              [
                {
                  path: '',
                  loadChildren: '../groupchat/groupchat.module#GroupchatPageModule'
                }
              ]
          },
          {
            path: 'tab2',
            children:
              [
                {
                  path: '',
                  loadChildren: '../groups/groups.module#GroupsPageModule'
                }
              ]
          },
          {
            path: '',
            redirectTo: '/grouptabs/groupchat',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/grouptabs/groupchat',
        pathMatch: 'full'
      }
    ] 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GrouptabsPage]
})

export class GrouptabsPageModule {

}
