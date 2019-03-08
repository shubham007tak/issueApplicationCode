import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { SocketService } from '../../socket.service';
import { saveAs } from 'file-saver';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { NgxEditorModule } from 'ngx-editor';

import { slideInOutAnimation } from '../../_animations/index';

const uri = 'http://api.takgranites.com/api/v1/issue/file/upload';



@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css'],
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class UpdateIssueComponent implements OnInit {
  description: string;
  status: string;
  allUsersData: any;
  allUsers: any[];
  userName: string;
  fullNameCreatedFor: string;
  allUsersSort: any[];
  comment: string;
  createdForIssueId: string;
  allComments: any[];
  allCommentsData: any;
  allWatchersData: any;
  allWatchers: any[];
  userFullName: string;
  userId: any;
  allWatchersIds: any[];
  allWatchersDataforIds: any;
  attachment: any;
  array1: any[];

  uploader: FileUploader = new FileUploader({ url: uri });
  attachmentList: any = [];
  disableButton: boolean;
  disableButton1: boolean;
  userLoginId: any;
  particularWatcher: any;
  allWatcherList: boolean;
  createWatcherButton: boolean;




  constructor(
    public appService: AppService,
    private toastr: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    public socketService: SocketService
  ) { }


  public issueId: string;

  public title: String;
  public createdBy: string;
  public createdById: string;
  public createdByEmail: string;
  public userInfo: any;
  public authToken: any;
  public createdFor: string;
  public createdForEmail: string;
  public issues: any;


  editorConfig: NgxEditorModule = {
    'minHeight': '3rem',
    'imageEndPoint': '',
    'toolbar': [
      ['bold', 'italic', 'underline', 'subScript', 'strikeThrough', 'superScript'],
      ['fontName', 'fontSize', 'fontFamily'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justify', '', ''],
      ['cut', 'copy', 'delete'],
      ['undo', 'redo'],
      ['paragraph', 'blockquote', 'rmoveBlockquote', 'unorderedList', 'OrderedList']
    ]
  };

  ngOnInit() {

    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.createdBy = Cookie.get('receiverName');
    this.createdById = Cookie.get('receiverId');
    this.createdByEmail = Cookie.get('receiverEmail');
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    if (this.userInfo === null) {
      this.toastr.error('Local Storage Error');
      this.router.navigate(['/']);

    }
    this.userName = this.userInfo.userName;
    this.userFullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
    this.userLoginId = this.userInfo.userId;
    this.particularWatcher = false;
    this.allWatcherList = false;
    this.createWatcherButton = true;

    if (Cookie.get('authToken') === null || Cookie.get('authToken') === '' || Cookie.get('authToken') === undefined) {
      this.router.navigate(['/']);
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
      this.attachment = this.attachmentList[0].uploadname;
    };

    this.getSingleIssueDetails();
    this.getAllUsers();
    this.getAllCommentsOfPaticularIssueOnInit();
    this.getAllWatchersOfPaticularIssueOnInit(this.issueId);
    this.getAllWatchersOfPaticularIssue(this.issueId);


  }
  // used for File Upload button
  truthClick() {
    this.disableButton = true;
  }
  truthClick1() {
    this.disableButton1 = true;
  }

  // used to download the attachment
  download(filename) {
    this.appService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
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
        });
    } else {
      this.toastr.info('authorization token missing, try logging in again');
      this.router.navigate(['/login']);
    }
  }


  public getSingleUserDetails() {
    this.appService.getSingleUser(this.createdFor)
      .subscribe((data) => {
        if (data.status === 200) {


          this.fullNameCreatedFor = `${data.data.firstName} ${data.data.lastName}`;
        } else {
          this.toastr.warning(data.message);
        }
      }, (error) => {
        this.toastr.error('something went wrong');
      });
  }

  public getSingleIssueDetails() {
    this.appService.getSingleIssueDetails(this.issueId, this.authToken)
      .subscribe((data) => {

        if (data.status === 200) {
          this.issues = data.data;
          this.toastr.success('Issue Found');
          this.title = this.issues.title;
          this.createdBy = this.issues.createdBy;
          this.createdByEmail = this.issues.createdByEmail;
          this.createdById = this.issues.createdById;
          this.createdFor = this.issues.createdFor;
          this.createdForEmail = this.issues.createdForEmail;
          this.description = this.issues.description;
          this.status = this.issues.status;
          this.fullNameCreatedFor = this.issues.fullNameCreatedFor;
          this.attachment = this.issues.attachment;
          this.getSingleUserDetails();
        } else {
          this.toastr.warning(data.message);
        }
      }, (error) => {
        this.toastr.error('something went wrong');
      });
  }



  public updateIssue() {

    const data = {
      issueId: this.issueId,
      title: this.title,
      description: this.description,
      status: this.status,
      createdFor: this.createdFor,
      attachment: this.attachment,
      authToken: this.authToken // pops out invalid token
    };
    this.appService.updateIssue(data)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data) => {
        if (data.status === 200) {

          this.toastr.success('Issue Updated Successfully');
          const notifyAssignee = {
            message: ` Issue ${this.title} has been updated by ${this.userFullName}`,
            userId: this.createdFor,
            issueId: this.issueId,
          };

          this.notifyUpdate(notifyAssignee);
          const notifyReporter = {
            message: ` Issue ${this.title} has been updated by ${this.userFullName}`,
            userId: this.createdById,
            issueId: this.issueId,
          };
          this.notifyUpdate(notifyReporter);
          if (this.allWatchersIds) {
            this.allWatchersIds.filter((a) => {
              const notifyWatchers = {
                message: `comment "${data.comment}" has been created by ${this.userFullName}`,
                userId: a.userId,
                issueId: data.createdForIssueId
              };
              this.notifyCommentUpdate(notifyWatchers);
            });
          }
          // if (this.allWatchersIds) {
          // for (let i = 0; i < this.allWatchersIds.length; i++) {
          //   const notifyWatchers = {
          //     message: ` Issue ${this.title} has been updated by ${this.userFullName}`,
          //     userId: this.allWatchersIds[i].userId,
          //     issueId: this.issueId,
          //   };
          //   this.notifyUpdate(notifyWatchers);
          // }}
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.toastr.warning(data.message);
        }
      }, (error) => {
        this.toastr.error('Something went wrong');
      });
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

  public deleteIssue(issueId) {
    this.appService.deleteIssue(issueId, this.userFullName, this.authToken)
      .subscribe((data) => {
        if (data.status === 200) {
          this.toastr.success('Issue deleted successfully');
          const notify = {
            message: `${this.title} has been deleted by ${this.userFullName}`,
            userId: this.createdFor
          };
          this.notifyUpdate(notify);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.toastr.warning(data.message);
        }
      }, (err) => {
        this.toastr.error('something went wrong');
      });
  }




  public notifyUpdate(data): any {
    this.socketService.notifyUpdates(data);
  }

  public notifyCommentUpdate(data): any {
    this.socketService.notifyUpdates(data);
  }

  public goBack() {
    this.router.navigate(['/dashboard']);
  }
  public getAllWatchersOfPaticularIssueOnInit(issueId) {
    if (this.authToken) {
      this.appService.getAllWatchersOfPaticularIssueOnInit(issueId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.allWatcherList = true;
            this.allWatchersData = response.data;
            for (const watcher in this.allWatchersData) {
              if (this.allWatchersData[watcher].userId === this.userLoginId) {
                this.particularWatcher = true;
                this.createWatcherButton = false;
              } else {
                this.createWatcherButton = true;
              }

            }

          } else if (response.status === 404) {
            this.allWatcherList = false;

          } else {
            this.toastr.error(response.message);
          }
        }, (error) => {
          this.toastr.error('something went wrong');
        });
    } else {
      this.toastr.info('authorization token missing, try logging in again');
      this.router.navigate(['/login']);
    }
  }

  public createWatcher(): any {
    const data = {
      userId: this.userInfo.userId,
      createdForIssueId: this.issueId,
      createdBy: this.userFullName,
      authToken: this.authToken
    };
    this.appService.createWatcher(data)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success('watcher assigned');
          this.getAllWatchersOfPaticularIssueOnInit(this.issueId);
          this.getAllWatchersOfPaticularIssue(this.issueId);


          const notify = {
            message: `${this.title} has been created by ${this.userFullName}`,
            userId: this.createdFor
          };
          this.notifyUpdate(notify);
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (error) => {
        this.toastr.error('something went wrong');
      });
  }

  public deleteWatcher() {
    const data1 = {
      userId: this.userInfo.userId,
      createdForIssueId: this.issueId,
      authToken: this.authToken
    };
    this.appService.deleteWatcher(data1)
      .subscribe((data) => {
        if (data.status === 200) {
          this.toastr.success('watcher deleted successfully');
          this.allWatchersData.map((i, index, a2) => {
            if (index < 1) {
              a2.splice(index, 1);
            }
          });
          this.particularWatcher = false;
          this.createWatcherButton = true;
          this.getAllWatchersOfPaticularIssueOnInit(this.issueId);
          this.getAllWatchersOfPaticularIssue(this.issueId);
          const notify = {
            message: `${this.title} has been deleted by ${this.userFullName}`,
            userId: this.createdFor
          };
          this.notifyUpdate(notify);
        } else {
          this.toastr.warning(data.message);
        }
      }, (err) => {
        this.toastr.error('something went wrong');
      });
  }

  public getAllWatchersOfPaticularIssue: any = (issueId) => {
    this.appService.getAllWatchersOfPaticularIssueOnInit(issueId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.allWatchersDataforIds = response.data;
          this.allWatchersIds = this.allWatchersDataforIds;

        } else {
          if (response.status === 404) {
            this.allWatchersIds = [];
          }
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error('something went wrong');
      });
  }





  public createComment(): any {
    if (!this.comment) {
      this.toastr.warning('Comment is Missing');
    } else if (this.comment === null || this.comment === ' ' || this.comment === undefined) {
      this.toastr.warning('Please enter appropriate comment');
    } else {
      const data = {
        comment: this.comment,
        createdForIssueId: this.issueId,
        createdBy: this.userFullName,
        createdForReporterEmail: this.createdByEmail,
        createdById: this.userLoginId,
        authToken: this.authToken
      };

      this.comment = null;
      this.appService.createComment(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            const commentData = apiResponse.data;
            this.toastr.success('comment created');
            this.getAllCommentsOfPaticularIssueOnInit();
            const notifyAssignee = {
              message: `comment "${data.comment}" has been created by ${this.userFullName}`,
              userId: this.createdFor,
              issueId: data.createdForIssueId
            };

            this.notifyCommentUpdate(notifyAssignee);
            const notifyReporter = {
              message: `comment "${data.comment}" has been created by ${this.userFullName}`,
              userId: this.createdById,
              issueId: data.createdForIssueId
            };
            this.notifyCommentUpdate(notifyReporter);
            if (this.allWatchersIds) {
              this.allWatchersIds.filter((a) => {
                const notifyWatchers = {
                  message: `comment "${data.comment}" has been created by ${this.userFullName}`,
                  userId: a.userId,
                  issueId: data.createdForIssueId
                };
                this.notifyCommentUpdate(notifyWatchers);
              });
            }
          } else {
            this.toastr.error(apiResponse.message);
          }
        }, (error) => {
          this.toastr.error('something went wrong');
        });
    }
  }

  public getAllCommentsOfPaticularIssueOnInit() {
    if (this.authToken) {
      this.appService.getAllCommentsOfPaticularIssueOnInit(this.issueId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.allCommentsData = response.data;
            this.allComments = this.allCommentsData.reverse();
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


  public deleteComment(commentId) {
    this.appService.deleteComment(commentId, this.authToken)
      .subscribe((data) => {
        if (data.status === 200) {
          this.toastr.success('Comment deleted successfully');
          this.allComments.map((i, index, a2) => {
            if (index < 1) {
              a2.splice(index, 1);
            }
          });
          this.getAllCommentsOfPaticularIssueOnInit();
          const notify = {
            message: `${this.title} has been deleted by ${this.userFullName}`,
            userId: this.createdFor
          };
          this.notifyUpdate(notify);
        } else {
          this.toastr.warning(data.message);
        }
      }, (err) => {
        this.toastr.error('something went wrong');
      });
  }

}
