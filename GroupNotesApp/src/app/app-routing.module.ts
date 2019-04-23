import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Allows for routing between pages - once a page is created, the route to this page is automatically added to this array
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'update-note', loadChildren: './update-note/update-note.module#UpdateNotePageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'groups', loadChildren: './groups/groups.module#GroupsPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'newgroup', loadChildren: './newgroup/newgroup.module#NewgroupPageModule' },
  { path: 'allgroups', loadChildren: './allgroups/allgroups.module#AllgroupsPageModule' },
  { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}
