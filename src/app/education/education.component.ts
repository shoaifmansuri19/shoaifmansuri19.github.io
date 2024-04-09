import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  onUpdate() {
    this.userDataService
      .updateEducation(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }

  getEducation() {
    return (this.childForm.get('Education') as FormArray).controls;
  }

  addEducation() {
    (this.childForm.get('Education') as FormArray).push(
      new FormGroup({
        degree: new FormControl(null, [Validators.required]),
        college: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
      })
    );
    if (this.config.data) {
      this.childForm.get('Education').patchValue(this.config.data.Education);
    }
  }

  removeEducation(index) {
    (this.childForm.get('Education') as FormArray).removeAt(index);
  }

  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Education', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Education.length; i++) {
        this.config.data.Education[i].startDate = new Date(
          this.config.data.Education[i].startDate
        );
        this.config.data.Education[i].endDate = new Date(
          this.config.data.Education[i].endDate
        );
        console.log(this.config.data.Education[i]);
        this.addEducation();
      }
    }
  }
}
