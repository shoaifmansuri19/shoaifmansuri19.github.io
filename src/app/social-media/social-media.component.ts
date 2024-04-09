import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;
  constructor(
    public config: DynamicDialogConfig,
    private http: HttpClient,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}
  profilePage = [
    { page: 'Twitter' },
    { page: 'Youtube' },
    { page: 'Git hub' },
    { page: 'Facebook' },
    { page: 'LinkedIn' },
  ];

  onUpdate() {
    this.userDataService
      .updateSocialInfo(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }

  getMediaInfo() {
    return (this.childForm.get('Socials') as FormArray).controls;
  }
  addMediaInfo() {
    (this.childForm.get('Socials') as FormArray).push(
      new FormGroup({
        redirectionLink: new FormControl(null, [Validators.required]),
        name: new FormControl(),
      })
    );
    if (this.config.data) {
      this.childForm.get('Socials').patchValue(this.config.data.Socials);
    }
  }

  removeSocials(index) {
    (this.childForm.get('Socials') as FormArray).removeAt(index);
  }
  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Socials', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Socials.length; i++) {
        this.addMediaInfo();
      }
    }
  }
}
