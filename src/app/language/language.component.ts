import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;
  languageName: any;
  password: any;
  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  languages = [
    { level: 'Professional Proficiency' },
    { level: 'Native Speaker' },
  ];

  onUpdate() {
    this.userDataService
      .updateLanguage(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }
  getLanguages() {
    return (this.childForm.get('Languages') as FormArray).controls;
  }
  addLanguage() {
    (this.childForm.get('Languages') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        level: new FormControl(null, [Validators.required]),
      })
    );
    if (this.config.data) {
      this.childForm.get('Languages').patchValue(this.config.data.Languages);
    }
  }
  removeLanguage(index) {
    (this.childForm.get('Languages') as FormArray).removeAt(index);
  }
  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Languages', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Languages.length; i++) {
        this.addLanguage();
      }
    }
  }
}
