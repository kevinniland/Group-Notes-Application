import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'update-note', loadChildren: './update-note/update-note.module#UpdateNotePageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },  { path: 'grouptabs', loadChildren: './grouptabs/grouptabs.module#GrouptabsPageModule' },
  { path: 'groupmembers', loadChildren: './groupmembers/groupmembers.module#GroupmembersPageModule' },
  { path: 'groups', loadChildren: './groups/groups.module#GroupsPageModule' },
  { path: 'groupchat', loadChildren: './groupchat/groupchat.module#GroupchatPageModule' },
  { path: 'newgroup', loadChildren: './newgroup/newgroup.module#NewgroupPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}
