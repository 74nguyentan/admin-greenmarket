import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comfim-dialog',
  templateUrl: './comfim-dialog.component.html',
  styleUrls: ['./comfim-dialog.component.css']
})
export class ComfimDialogComponent implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<ComfimDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
  }
}
