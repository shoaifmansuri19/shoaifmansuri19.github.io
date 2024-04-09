import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EducationComponent } from '../education/education.component';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss'],
})
export class EditEducationComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  showDialog() {
    this.ref = this.dialogService.open(EducationComponent, {
      data: this.res.data,
      header: 'Edit education',
      width: '70%',
      baseZIndex: 10000,
    });
  }

  ngOnInit(): void {}
}
