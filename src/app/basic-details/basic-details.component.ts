import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
})
export class BasicDetailsComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;

  url = 'assets/images/avatar.svg';
  countries: any = [];
  states: any = [];
  cities: any = [];
  showFirstSpinner = false;
  showSecondSpinner = false;
  showThirdSpinner = false;

  constructor(
    private http: HttpClient,
    public config: DynamicDialogConfig,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  selectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.childForm.get('profileImage').setValue(event.target.result);
      };
    }
  }

  onUpdate() {
    console.log('this.childForm.value :', this.childForm.value);

    this.userDataService
      .updateBasicDetails(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }

  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.getAccessToken().then(
      (authToken) => {
        let httpHeaders = new HttpHeaders()
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + authToken);
        this.showFirstSpinner = true;
        this.http
          .get('https://www.universal-tutorial.com/api/countries/', {
            headers: httpHeaders,
          })
          .subscribe((countries) => {
            this.countries = countries;
            this.showFirstSpinner = false;
            if (this.config.data) {
              this.childForm.get('country').setValue(this.config.data.country);
            } else {
              this.childForm.get('country').setValue(countries[0].country_name);
            }
            this.getStates();
          });
      },
      (error) => {
        console.log(error);
      }
    );

    this.childForm.addControl('country', new FormControl());
    this.childForm.addControl('state', new FormControl());
    this.childForm.addControl('city', new FormControl());
    this.childForm.addControl(
      'firstname',
      new FormControl(null, [Validators.required])
    );
    this.childForm.addControl(
      'email',
      new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ])
    );
    this.childForm.addControl(
      'lastname',
      new FormControl(null, [Validators.required])
    );
    this.childForm.addControl(
      'phone',
      new FormControl(null, [Validators.required])
    );
    this.childForm.addControl(
      'designation',
      new FormControl(null, [Validators.required])
    );
    this.childForm.addControl(
      'description',
      new FormControl(null, [Validators.required])
    );
    this.childForm.addControl(
      'profileImage',
      new FormControl(null, [Validators.required])
    );
    if (this.config.data) {
      this.childForm.patchValue(this.config.data);
      this.url = this.config.data.profileImage;
    }
  }

  getStates() {
    this.getAccessToken().then(
      (authToken) => {
        let httpHeaders = new HttpHeaders()
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + authToken);
        this.showSecondSpinner = true;
        this.http
          .get(
            'https://www.universal-tutorial.com/api/states/' +
              this.childForm.get('country').value,
            {
              headers: httpHeaders,
            }
          )
          .subscribe((states) => {
            this.states = states;
            this.showSecondSpinner = false;
            if (this.config.data) {
              this.childForm.get('state').setValue(this.config.data.state);
            } else {
              this.childForm.get('state').setValue(states[0].state_name);
            }
            this.getCities();
            console.log(states);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCities() {
    this.getAccessToken().then(
      (authToken) => {
        let httpHeaders = new HttpHeaders()
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + authToken);
        this.showThirdSpinner = true;
        this.http
          .get(
            'https://www.universal-tutorial.com/api/cities/' +
              this.childForm.get('state').value,
            {
              headers: httpHeaders,
            }
          )
          .subscribe((cities) => {
            this.cities = cities;
            this.showThirdSpinner = false;
            if (this.config.data) {
              this.childForm.get('city').setValue(this.config.data.city);
            } else {
              this.childForm.get('city').setValue(cities[0].city_name);
            }
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAccessToken() {
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders()
        .set('Accept', 'application/json')
        .set(
          'api-token',
          'yLrNAT7xKDaoPr4GKZGjQZAY1zwlR_beAlkmnlmPWAmB7LM5CletsA0tgWj9nRAIgrY'
        )
        .set('user-email', 'ansari.shohrab80@gmail.com');
      this.http
        .get('https://www.universal-tutorial.com/api/getaccesstoken', {
          headers: httpHeaders,
        })
        .subscribe(
          (response) => {
            resolve(response['auth_token']);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
