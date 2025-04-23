import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe, DecimalPipe } from '@angular/common';

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
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    protected readonly Object = Object;
}
