import { Component, Input, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss'],
})
export class EditProjectsComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig
  ) {}

  showDialog() {
    this.ref = this.dialogService.open(ProjectsComponent, {
      data: this.res.data,
      header: 'Edit projects',
      width: '70%',
      baseZIndex: 10000,
    });
  }
  ngOnInit(): void {}
}
