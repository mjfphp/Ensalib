import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import template from  './dialog-data.html';
@Component({
    selector: 'dialog-data-example-dialog',
    template
})
export class DialogData {
    constructor( public dialogRef: MatDialogRef<DialogData>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
}