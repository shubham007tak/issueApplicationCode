import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { UpdateIssueComponent } from './update-issue/update-issue.component';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

import {FileUploadModule} from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [CreateIssueComponent, UpdateIssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    FormsModule,
    FileUploadModule,
    NgxEditorModule,
    NgxPaginationModule
  ]
})
export class IssueModule { }
