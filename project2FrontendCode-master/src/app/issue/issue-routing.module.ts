import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { UpdateIssueComponent } from './update-issue/update-issue.component';



const routes: Routes = [
  {
    path: 'create-issue',
    component: CreateIssueComponent
  },
  {
    path: 'update-issue/:issueId',
    component: UpdateIssueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
