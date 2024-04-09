import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  onUpdate() {
    this.userDataService
      .updateExperience(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }

  getExperience() {
    return (this.childForm.get('Experiences') as FormArray).controls;
  }
  addExperience() {
    (this.childForm.get('Experiences') as FormArray).push(
      new FormGroup({
        company: new FormControl(null, [Validators.required]),
        designation: new FormControl(null, [Validators.required]),
        joiningDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
      })
    );
    if (this.config.data) {
      this.childForm
        .get('Experiences')
        .patchValue(this.config.data.Experiences);
    }
  }

  removeExperience(index) {
    (this.childForm.get('Experiences') as FormArray).removeAt(index);
  }

  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Experiences', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Experiences.length; i++) {
        this.config.data.Experiences[i].joiningDate = new Date(
          this.config.data.Experiences[i].joiningDate
        );
        this.config.data.Experiences[i].endDate = new Date(
          this.config.data.Experiences[i].endDate
        );
        this.addExperience();
      }
    }
  }
}
