import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-investor-details',
    imports: [
        DecimalPipe,
        DatePipe,

    ],
    templateUrl: './investor-details.component.html',
    standalone: true,
    styleUrl: './investor-details.component.scss',
})
export class InvestorDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<InvestorDetailsComponent>) {}

    protected readonly Object = Object;

    close() {
        this.dialogRef.close();

    }
}
