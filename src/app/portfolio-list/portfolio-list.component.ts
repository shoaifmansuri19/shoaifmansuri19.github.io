import { Component, Input, OnInit } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { UserDataService } from '..//services/user-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
})
export class PortfolioListComponent implements OnInit {
  res;
  message;
  showDeleteMessage: boolean = false;
  userEmailArray: any;
  constructor(
    public userDataService: UserDataService,
    private router: Router
  ) {}

  showPortfolio(email) {
    this.router.navigate(['/template', email]);
  }
  deletePortfolio(email, i) {
    console.log(i, this.userEmailArray[i]);
    this.userDataService.deleteUserDetails(email).subscribe(
      (response: any) => {
        if (response.success) {
          this.userEmailArray.splice(i, 1);
        }
        this.message = response.message;
        this.showDeleteMessage = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.userDataService.getUserPortfolio().subscribe(
      (response: any) => {
        if (response.data) {
          console.log(response);
          this.userEmailArray = response.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
