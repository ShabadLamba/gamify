import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  taskName: string;
  timeSpent: number;
  rewardTimeEarned: number;
  icon: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    icon: 'https://static.thenounproject.com/png/835259-200.png',
    taskName: 'Gym',
    timeSpent: 1,
    rewardTimeEarned: 0.1,
  },
  {
    icon:
      'https://img2.pngio.com/heirarchy-icon-181633-free-icons-library-data-structure-diagram-png-512_512.jpg',
    taskName: 'DSA',
    timeSpent: 2,
    rewardTimeEarned: 0.2,
  },
];

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  displayedColumns: string[] = [
    'icon',
    'taskName',
    'timeSpent',
    'rewardTimeEarned',
    'action',
  ];
  dataSource = ELEMENT_DATA;
  createNew = false;

  taskForm: FormGroup;
  regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      icon: [null, [Validators.required, Validators.pattern(this.regUrl)]],
      taskName: [null, Validators.required],
    });
  }

  submit() {
    if (!this.taskForm.valid) {
      return;
    }
    const outputData = {
      icon: this.taskForm.value.icon,
      taskName: this.taskForm.value.taskName,
      timeSpent: 0,
      rewardTimeEarned: 0,
    };
    this.dataSource.push(outputData);
    this.table.renderRows();
    console.log(outputData);
    console.log(this.dataSource);
    this.createNew = !this.createNew;
    console.log(this.taskForm.value);
  }

  deleteRow(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.taskName != row_obj.taskName;
    });
  }
}
