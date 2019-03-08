import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient, private toastr: ToastrService) {
  }
 // private url = 'http://localhost:3000';
 private url = 'http://api.takgranites.com';

  downloadFile(file: String) {
    // tslint:disable-next-line:prefer-const
    let body = {filename: file};

    return this.http.post(`${this.url}/api/v1/issue/file/download`, body, {
        responseType : 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
}
  public signUpFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('userName', data.userName)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('countryName', data.countryName)
      .set('countryCode', data.countryCode)
      .set('fullName', data.fullName);
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  }

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  }

  public forgotPassword(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email);
    return this.http.post(`${this.url}/api/v1/users/forgotPassword`, params);
  }


  public resetPassword(data): Observable<any> {
    const params = new HttpParams()
      .set('userId', data.userId)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/resetPassword`, params);
  }

  public getAllCountryPhoneFromJson(): Observable<any> {
    const data = this.http.get('../assets/data.json');
    return data;
  }

  public getAllCountryNamesFromJson(): Observable<any> {
    const data = this.http.get('../assets/countryNames.json');
    return data;
  }



  public getUserInfoFromLocalstorage = () => {
    try {
    return JSON.parse(localStorage.getItem('userInfo'));
    } catch (exception) {
      console.error(exception);
    }
}

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public logout(userId, authToken): Observable<any> {
    const params = new HttpParams()
      .set('authToken', authToken);
    return this.http.post(`${this.url}/api/v1/users/logout/${userId}`, params);
  }

  public getUsers(authToken): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/view/all?authToken=${authToken}`);
  }
  public getSingleUser(userId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/view/${userId}?authToken=${Cookie.get('authToken')}`);
  }


  public createIssue(data): Observable<any> {
    const params = new HttpParams()
      .set('title', data.title)
      .set('createdBy', data.createdBy)
      .set('createdById', data.createdById)
      .set('createdByEmail', data.createdByEmail)
      .set('createdFor', data.createdFor)
      .set('createdForEmail', data.createdForEmail)
      .set('authToken', data.authToken)
      .set('description', data.description)
      .set('status', data.status)
      .set('fullNameCreatedFor', data.fullNameCreatedFor)
      .set('attachment', data.attachment);
    return this.http.post(`${this.url}/api/v1/issue/createIssue`, params);
  }

  public createComment(data): Observable<any> {
    const params = new HttpParams()
      .set('comment', data.comment)
      .set('createdBy', data.createdBy)
      .set('createdById', data.createdById)
      .set('createdForReporterEmail', data.createdByEmail)
      .set('createdForIssueId', data.createdForIssueId)
      .set('authToken', data.authToken);
    return this.http.post(`${this.url}/api/v1/comment/createComment`, params);
  }
  public createWatcher(data): Observable<any> {
    const params = new HttpParams()
      .set('userId', data.userId)
      .set('createdForIssueId', data.createdForIssueId)
      .set('createdBy', data.createdBy)
      .set('authToken', data.authToken);
    return this.http.post(`${this.url}/api/v1/watcher/createWatcher`, params);
  }

  public getAllIssues(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issue/allIssues?authToken=${Cookie.get('authToken')}`);
  }

  public getAllCommentsOfPaticularIssueOnInit(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/comment/getAllCommentsOfPaticularIssueOnInit/${issueId}?authToken=${Cookie.get('authToken')}`);
  }
  public getAllWatchersOfPaticularIssueOnInit(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/watcher/getAllWatchersOfPaticularIssueOnInit/${issueId}?authToken=${Cookie.get('authToken')}`);
  }




  public getSelectedUserIssues(createdById, createdFor, authToken): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.url}/api/v1/issue/getSelectedUserIssues?createdById=${createdById}&createdFor=${createdFor}&authToken=${authToken}`);
  }

  public updateIssue(data): Observable<any> {
    const params = new HttpParams()
      .set('title', data.title)
      .set('createdFor', data.createdFor)
      .set('status', data.status)
      .set('description', data.description)
      .set('attachment', data.attachment)
      .set('authToken', data.authToken);
    return this.http.put(`${this.url}/api/v1/issue/updateIssue/${data.issueId}`, params);
  }

  public getSingleIssueDetails(issueId, authToken): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issue/getSingleIssue/${issueId}?authToken=${authToken}`);
  }

  public getNormalUserIssues(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issue/getNormalIssues/${issueId}?authToken=${Cookie.get('authToken')}`);
  }

  public getAllIssuesAssignedToParticularUserOnInit(userId): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.url}/api/v1/issue/getAllIssuesAssignedToParticularUserOnInit/${userId}?authToken=${Cookie.get('authToken')}`);
  }

  public deleteIssue(issueId, userFullName, authToken): Observable<any> {
    const params = new HttpParams()
      .set('authToken', authToken);
    return this.http.post(`${this.url}/api/v1/issue/deleteIssue/${issueId}`, params);
  }

  public deleteComment(commentId, authToken): Observable<any> {
    const params = new HttpParams()
      .set('authToken', authToken);
    return this.http.post(`${this.url}/api/v1/comment/deleteComment/${commentId}`, params);
  }
  public deleteWatcher(data): Observable<any> {
    const params = new HttpParams()
    .set('userId', data.userId)
    .set('createdForIssueId', data.createdForIssueId)
    .set('authToken', data.authToken);
    return this.http.post(`${this.url}/api/v1/watcher/deleteWatcher`, params);
  }

  public facebookOAuth(data): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/oauth/facebook`, { access_token: data.token});
  }

  public socialLogin(data): Observable<any> {

    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('email', data.email)
    .set('lastName', data.lastName)
    .set('fullName', data.fullName);
    return this.http.post(`${this.url}/api/v1/users/socialLogin`, params);
  }


}
