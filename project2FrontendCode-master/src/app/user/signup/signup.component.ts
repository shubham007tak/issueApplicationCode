import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public userName: string;
  public password: any;
  public country: any;
  public mobileNumber: any;
  public isAdmin: boolean;

  public countryName: string;
  public allCountries: any;
  public countryCode: string;
  public countries: any[] = [];
  public countryCodes: string[];
  public userType: any;



  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllCountries();
    this.getAllCountryPhone();
  }
  public getAllCountries() {
    this.appService.getAllCountryNamesFromJson()
      .subscribe((data) => {
        this.allCountries = data;
        // tslint:disable-next-line:forin
        for (const x in data) {
          const singleCountryData = {
            code: x,
            name: data[x]
          };
          this.countries.push(singleCountryData);
        }
        this.countries = this.countries.sort((first, second) => {
          return first.name.toUpperCase() < second.name.toUpperCase() ? -1 :
            (first.name.toUpperCase() > second.name.toUpperCase() ? 1 : 0);
        });
      });
  }
  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  } // end goToSignIn
  public getAllCountryPhone() {
    this.appService.getAllCountryPhoneFromJson()
      .subscribe((data) => {
        this.countryCodes = data;
      });
  }

  public onChangeEvent() {
    this.countryCode = this.countryCodes[this.country];
    // console.log(this.countryCode)
    this.countryName = this.allCountries[this.country];

  }







  public signUpFunction: any = () => {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password,
      userName: this.userName,
      countryName: this.country,
      countryCode: this.countryCode,
      fullName: `${this.firstName} ${this.lastName}`
    };
    console.log(data);
    this.appService.signUpFunction(data)
      .subscribe((apiResponse) => {
        // console.log(apiResponse);
        if (apiResponse.status === 200) {
          this.toastr.success('Signup successful');
          setTimeout(() => {
            this.goToSignIn();
          }, 1000);
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
        this.toastr.error('some error occured');
      });
  } // end signupFunction



}
