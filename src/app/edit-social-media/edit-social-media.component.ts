import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'app-edit-social-media',
  templateUrl: './edit-social-media.component.html',
  styleUrls: ['./edit-social-media.component.scss'],
})
export class EditSocialMediaComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  user_email;
  constructor(private dialogService: DialogService) {}

  showDialog() {
    this.ref = this.dialogService.open(SocialMediaComponent, {
      data: this.res.data,
      header: 'Edit Social media information',
      width: '70%',
      baseZIndex: 10000,
    });
  }

  ngOnInit(): void {}
}
