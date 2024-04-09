import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { UserDataService } from '..//services/user-data.service';
@Component({
  selector: 'app-edit-basic-details',
  templateUrl: './edit-basic-details.component.html',
  styleUrls: ['./edit-basic-details.component.scss'],
})
export class EditBasicDetailsComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

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
