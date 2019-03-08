import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public password: string;
  public confirmPassword: string;
  public userId: string = this.route.snapshot.paramMap.get('userId');

  constructor(private router: Router, private appService: AppService, private toastr: ToastrService,
    public route: ActivatedRoute) { }

  ngOnInit() {
  }




  public matchPassword() {
    if (this.password === this.confirmPassword) {
      this.toastr.success('password matched');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
      return true;
    } else {
      this.toastr.warning('password match failed');
      return false;
    }
  }

  public resetPassword() {
    if (this.matchPassword()) {
      // tslint:disable-next-line:prefer-const
      let data = {
        userId: this.userId,
        password: this.password
      };
      this.appService.resetPassword(data).subscribe((response) => {
        if (response.status === 200) {
          this.toastr.success('password changed successfully');
        } else {
          this.toastr.error(response.message);
        }
      }, (err) => {
        this.toastr.error(err.message);
      });
    }
  }



}
