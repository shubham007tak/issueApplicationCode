import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    private socialAuthService: AuthService) { }

  ngOnInit() {
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        const data = {
          firstName: userData.name.split(' ').slice(0, -1).join(' '),
          lastName: userData.name.split(' ').slice(-1).join(' '),
          email: userData.email,
          fullName: userData.name
        };
        console.log(data);
        this.appService.socialLogin(data)
          .subscribe((apiResponse) => {
            if (apiResponse.status === 200) {

              Cookie.set('authToken', apiResponse.data.authToken);
              Cookie.set('receiverId', apiResponse.data.userDetails.userId);
              Cookie.set('receiverEmail', apiResponse.data.userDetails.email);
              Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
              this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
              this.router.navigate(['dashboard']);
            } else {
              this.toastr.error(apiResponse.message);
            }
          }, (err) => {
            this.toastr.error('Internal Server Error');
          });

      }
    );
  }

  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  } // end goToSignUp

  public signinFunction: any = () => {
    const data = {
      email: this.email,
      password: this.password
    };
    this.appService.signinFunction(data)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {

          Cookie.set('authToken', apiResponse.data.authToken);
          Cookie.set('receiverId', apiResponse.data.userDetails.userId);
          Cookie.set('receiverEmail', apiResponse.data.userDetails.email);
          Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.router.navigate(['dashboard']);
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
        this.toastr.error('Check your Username and Password');
      });

  } // end signinFunction

}
