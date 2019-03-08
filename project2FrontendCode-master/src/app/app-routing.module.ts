import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'issue',
    loadChildren: './issue/issue.module#IssueModule'
  },
  {
    path: '',
    loadChildren: './user/user.module#UserModule'
  },


  {
    path: '**',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '*',
    loadChildren: './user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
