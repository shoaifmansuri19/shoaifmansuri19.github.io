import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.scss'],
})
export class EditSkillsComponent implements OnInit {
  @Input() res;
  ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  showdescription() {
    console.log(this.res.data);
  }
  showDialog() {
    this.ref = this.dialogService.open(SkillsComponent, {
      data: this.res.data,
      header: 'Edit skills',
      width: '70%',
      baseZIndex: 10000,
    });
  }
  ngOnInit(): void {}
}
