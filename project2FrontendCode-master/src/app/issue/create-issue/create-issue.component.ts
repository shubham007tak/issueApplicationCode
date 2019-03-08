import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { AppService } from 'src/app/app.service';
import { SocketService } from '../../socket.service';
import { VERSION } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import * as $ from 'jquery';

import { NgxEditorModule } from 'ngx-editor';

import { slideInOutAnimation } from '../../_animations/index';




const uri = 'http://api.takgranites.com/api/v1/issue/file/upload';
declare var $: any;

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css'],
  // make fade in animation available to this component
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class CreateIssueComponent implements OnInit, AfterViewInit {





  constructor(private http: HttpClient, public router: Router, public toastr: ToastrService,
    public appService: AppService, public socketService: SocketService) {
  }
  public title: string;
  public createdBy: string;
  public createdById: string;
  public createdByEmail: string;
  public userInfo: any;
  public createdFor: string;
  public createdForEmail: string;
  public authToken: string;
  public allUsers: any[];
  public allUsersData: any[];
  public status: string;
  public description: string;
  public allUsersSort: any;

  createdForUserId: string;
  createdForArray: any;
  singleUserData: any;

  percentDone: number;
  uploadSuccess: boolean;
  fullNameCreatedFor: string;
  attachment: any = [];

  uploader: FileUploader = new FileUploader({ url: uri });

  attachmentList: any = [];
  disableButton: boolean;
  disableButton1: boolean;
  userFullName: string;


  editorConfig: NgxEditorModule = {
    'minHeight': '3rem',
    'imageEndPoint': '',
    'toolbar': [
      ['bold', 'italic', 'underline', 'subScript', 'strikeThrough', 'superScript'],
      ['fontName', 'fontSize', 'fontFamily'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justify', '', ''],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'rmoveBlockquote', 'unorderedList', 'OrderedList']
    ]
  };

  ngOnInit() {
    this.createdBy = Cookie.get('receiverName');
    this.createdById = Cookie.get('receiverId');
    this.createdByEmail = Cookie.get('receiverEmail');
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.userFullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;

    if (Cookie.get('authToken') === null || Cookie.get('authToken') === '' || Cookie.get('authToken') === undefined) {
      this.router.navigate(['/']);
    }


    this.getAllUsers();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
      this.attachment = this.attachmentList[0].uploadname;
    };
  }

  ngAfterViewInit() {

  }

  truthClick() {
    this.disableButton = true;
  }
  truthClick1() {
    this.disableButton1 = true;
  }
  download(index) {
    // tslint:disable-next-line:prefer-const
    let filename = this.attachmentList[index].uploadname;

    this.appService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }




  public onChangeEvent() {
    this.createdForUserId = this.createdFor;

    this.getSingleUserData();


  }

  public getSingleUserData(): any {
    this.appService.getSingleUser(this.createdFor)
      .subscribe((data) => {
        if (data.status === 200) {
          this.singleUserData = data.data;
          this.fullNameCreatedFor = `${this.singleUserData.firstName} ${this.singleUserData.lastName}`;

        } else {
          this.toastr.error(data.message);
        }
      }, (error) => {
        this.toastr.error('something went wrong');
      });

  }

  public createIssue(): any {
    if (this.attachment.length === 0) {
      this.toastr.warning('Kindly attach screenshot');
    } else {
      const data = {
        title: this.title,
        createdFor: this.createdFor,
        createdForEmail: this.singleUserData.email,
        createdBy: this.createdBy,
        createdByEmail: this.createdByEmail,
        createdById: this.createdById,
        authToken: this.authToken,
        status: this.status,
        description: this.description,
        fullNameCreatedFor: this.fullNameCreatedFor,
        attachment: this.attachment
      };
      this.appService.createIssue(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('issue created');

            const notify = {
              message: `Issue ${this.title} has been assigned to you by ${this.createdBy}`,
              userId: data.createdFor,
              issueId: apiResponse.data.issueId
            };
            this.notifyUpdateToNormalUser(notify);
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 500);
          } else {
            this.toastr.error(apiResponse.message);
          }
        }, (error) => {

          this.toastr.error('something went wrong');
        });
    }

  }

  public getAllUsers() {
    if (this.authToken) {
      this.appService.getUsers(this.authToken)
        .subscribe((response) => {
          if (response.status === 200) {
            this.allUsersData = response.data;
            this.allUsers = [];
            this.allUsers = this.allUsersData.filter((a) => {
              if (a.userId !== this.createdById) {
                return a;
              }
            });
            this.allUsersSort = this.allUsers.sort((obj1, obj2) => {
              if (obj1.fullName > obj2.fullName) {
                return 1;
              }

              if (obj1.fullName < obj2.fullName) {
                return -1;
              }

              return 0;
            });
          } else {
            this.toastr.error(response.message);
          }
        }, (error) => {
          this.toastr.error('something went wrong');
          console.log(error);
        });
    } else {
      this.toastr.info('authorization token missing, try logging in again');
      this.router.navigate(['/login']);
    }
  }



  public logout: any = (userId) => {
    this.appService.logout(userId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.socketService.disconnectedSocket();
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
        this.toastr.error('some error occured');
      });
  }

  public goBack() {
    this.router.navigate(['/dashboard']);
  }

  public notifyUpdateToNormalUser(data): any {
    this.socketService.notifyUpdates(data);
  }



}
