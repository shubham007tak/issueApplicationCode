import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { SocketService } from '../../socket.service';


import { fadeInAnimation } from '../../_animations/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeInAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@fadeInAnimation]': '' }
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalAlert') modalAlert: TemplateRef<any>;

  public title: string;
  public createdBy: string;
  public createdById: string;
  public createdByEmail: string;
  public userInfo: any;
  public authToken: any;
  public createdFor: any;
  public createdForEmail: any;
  public allIssues: any[];
  public allIssuesData: any[];
  public gentleReminder: Boolean = true;
  public allIssuesSort: any;
  updateNotification: any;
  userFullName: string;

  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    public socketService: SocketService,
    private modal: NgbModal) { }

  listData: MatTableDataSource<any>;
  listData2: MatTableDataSource<any>;
  displayedColumns: string[] = ['status', 'title', 'reporter', 'date', 'actions'];
  displayedColumns2: string[] = ['status', 'title', 'reporter', 'date', 'actions'];
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  searchKey: string;
  searchKey2: string;

  ngOnInit() {

    this.createdBy = Cookie.get('receiverName');
    this.createdById = Cookie.get('receiverId');
    this.createdByEmail = Cookie.get('receiverEmail');
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.userFullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
    if (Cookie.get('authToken') == null || Cookie.get('authToken') === '' || Cookie.get('authToken') === undefined) {
      this.router.navigate(['/']);
    }
    this.getAllIssues();
    this.getUpdates();
    this.getAllIssuesAssignedToParticularUserOnInit();
  }

  onDelete(row) {
    this.deleteIssue(row.issueId);
  }
  onDelete1(row) {
    this.deleteIssue(row.issueId);

  }


  public goToUpdateIssuePage() {
    this.router.navigate([`/issue/update-issue/${this.updateNotification.issueId}`]);
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
          this.getAllIssues();
          this.getAllIssuesAssignedToParticularUserOnInit();
        } else {
          this.toastr.warning(data.message);
        }
      }, (err) => {
        this.toastr.error('something went wrong');
      });
  }

  public getAllIssues() {
    if (this.authToken) {
      this.appService.getAllIssues()
        .subscribe((response) => {
          if (response.status === 200) {
            this.allIssuesData = response.data;
            this.listData = new MatTableDataSource(this.allIssuesData);
            this.listData.sort = this.sort1;
            this.listData.paginator = this.paginator1;
            this.listData.filterPredicate = (data, filter) => {
              return this.displayedColumns.some(ele => {
                return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
              });
            };

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

  public getAllIssuesAssignedToParticularUserOnInit() {
    if (this.authToken) {
      this.appService.getAllIssuesAssignedToParticularUserOnInit(this.userInfo.userId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.allIssuesData = response.data;
            this.listData2 = new MatTableDataSource(this.allIssuesData);
            this.listData2.sort = this.sort2;
            this.listData2.paginator = this.paginator2;
            this.listData2.filterPredicate = (data, filter) => {
              return this.displayedColumns2.some(ele => {
                return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
              });
            };
            this.listData2 = new MatTableDataSource(this.allIssuesData);

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



  selectRow(row) {
    this.router.navigate([`/issue/update-issue/${row.issueId}`]);
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  onSearchClear2() {
    this.searchKey2 = '';
    this.applyFilter2();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  applyFilter2() {
    this.listData2.filter = this.searchKey2.trim().toLowerCase();
  }

  public logout: any = (userId) => {
    this.appService.logout(userId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {

          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.authToken = null;
          this.socketService.disconnectedSocket();
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        } else {
          this.toastr.error(apiResponse.message);
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.authToken = null;
          this.socketService.disconnectedSocket();
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        }
      }, (err) => {
        this.toastr.error('some error occured');
      });
  }

  public getUpdates() {
    this.socketService.getUpdates(this.userInfo.userId)
      .subscribe((data) => {
        this.getAllIssues();
        this.updateNotification = data;
        if (this.updateNotification.issueId) {
          this.modal.open(this.modalAlert, { size: 'sm' });
        }
        this.toastr.info('Updates from Admin', data.message);
      });
  }

  public notifyUpdate(data): any {
    this.socketService.notifyUpdates(data);
  }
}


