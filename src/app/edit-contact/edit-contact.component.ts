import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  user_email;
  constructor(private dialogService: DialogService) {}

  showDialog() {
    this.ref = this.dialogService.open(BasicDetailsComponent, {
      data: this.res.data,
      header: 'Edit basic details',
      width: '70%',
      baseZIndex: 10000,
    });
  }

  ngOnInit(): void {}
}
