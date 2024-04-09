import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDataService } from '..//services/user-data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() childForm: FormGroup;
  @Input() submitted;

  constructor(
    public config: DynamicDialogConfig,
    private http: HttpClient,
    private ref: DynamicDialogRef,
    public userDataService: UserDataService
  ) {}

  onUpdate() {
    console.log(this.childForm.value);

    this.userDataService
      .updateProject(this.childForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.ref.close();
  }

  getProjects() {
    return (this.childForm.get('Projects') as FormArray).controls;
  }
  addProjects() {
    (this.childForm.get('Projects') as FormArray).push(
      new FormGroup({
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
      })
    );
    if (this.config.data) {
      this.childForm.get('Projects').patchValue(this.config.data.Projects);
    }
  }

  removeProject(index) {
    (this.childForm.get('Projects') as FormArray).removeAt(index);
  }
  ngOnInit(): void {
    if (!this.childForm) {
      this.childForm = new FormGroup({});
    }
    this.childForm.addControl('Projects', new FormArray([]));
    if (this.config.data) {
      for (let i = 0; i < this.config.data.Projects.length; i++) {
        this.addProjects();
      }
    }
  }
}
