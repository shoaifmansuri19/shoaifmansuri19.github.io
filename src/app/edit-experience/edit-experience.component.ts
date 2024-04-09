import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss'],
})
export class EditExperienceComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  showDialog() {
    this.ref = this.dialogService.open(ExperienceComponent, {
      data: this.res.data,
      header: 'Edit work experience',
      width: '70%',
      baseZIndex: 10000,
    });
  }
  ngOnInit(): void {}
}
