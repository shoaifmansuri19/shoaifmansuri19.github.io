import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//..//app/services/user-data.service';
import { AppConstants } from '../constants';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  user_email;
  ref: DynamicDialogRef;
  showErrorMessage: boolean = false;
  errorMessage;
  showDeleteMessage: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngxService: NgxUiLoaderService,
    public userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    // let email = this.route.snapshot.paramMap.get('email');
    // let email = AppConstants.userEmail;
    // this.user_email = email;

    // this.ngxService.start();
    // this.spinner.show();
    // this.userDataService
    //   .getUserDetails(this.user_email)
    //   .subscribe((response) => {
    //     console.log({ response });

    //     if (!response.data) {
    //       this.showDeleteMessage = true;
    //       this.showErrorMessage = true;
    //       this.errorMessage = 'Can not fetch user details';
    //     }
    //     this.ngxService.stop();
    //     this.spinner.hide();
    //     console.log(this.res);
    //   });
  }

  deletePortfolio() {
    this.userDataService.deleteUserDetails(this.user_email).subscribe(
      (response: any) => {
        if (!response.data) {
          console.log(response);
          this.errorMessage = response.message;
        }
        this.showErrorMessage = true;
        this.showDeleteMessage = true;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.showErrorMessage = true;
      }
    );
  }
}
