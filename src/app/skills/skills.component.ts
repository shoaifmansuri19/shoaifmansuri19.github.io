import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;

  constructor(
    public config: DynamicDialogConfig,
    private http: HttpClient,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  skills = [
    { level: 'Beginner' },
    { level: 'Intermediate' },
    { level: 'Expert' },
    { level: 'Pro' },
  ];

  onUpdate() {
    this.userDataService
      .updateSkill(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }
  getSkills() {
    return (this.childForm.get('Skills') as FormArray).controls;
  }

  addSkills() {
    (this.childForm.get('Skills') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        level: new FormControl(),
      })
    );
    if (this.config.data) {
      this.childForm.get('Skills').patchValue(this.config.data.Skills);
    }
  }

  removeSkill(index) {
    (this.childForm.get('Skills') as FormArray).removeAt(index);
  }
  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Skills', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Skills.length; i++) {
        this.addSkills();
      }
    }
  }
}
