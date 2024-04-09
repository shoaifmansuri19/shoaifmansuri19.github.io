import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-edit-languages',
  templateUrl: './edit-languages.component.html',
  styleUrls: ['./edit-languages.component.scss'],
})
export class EditLanguagesComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  showDialog() {
    this.ref = this.dialogService.open(LanguageComponent, {
      data: this.res.data,
      header: 'Edit language',
      width: '70%',
      baseZIndex: 10000,
    });
  }

  ngOnInit(): void {}
}
