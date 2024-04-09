import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: { class: 'admin-container-host h-100' },
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  displayErrorMessage: boolean = false;
  errorMessage;
  submitted = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.http
        .post<any>(
          'http://localhost:3000/admin/register',
          this.registerForm.value
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            this.errorMessage = response.message;
            this.displayErrorMessage = true;
            this.router.navigate(['/template', response.email]);
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.displayErrorMessage = true;
          }
        );
    } else {
      this.errorMessage = 'Please fill valid details';
      this.displayErrorMessage = true;
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({});
  }
}
