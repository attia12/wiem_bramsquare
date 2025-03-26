import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
} from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { InvestissementService } from '../../../../Investissement/domain/services/investissement.service';
import { DeleveryCoutService } from '../../../domain/services/delevery-cout.service';

@Component({
    selector: 'app-list-cout',
    imports: [
        MatIcon,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        DecimalPipe,
        MatHeaderRow,
        MatRowDef,
        MatHeaderRowDef,
        MatRow,
    ],
    templateUrl: './list-cout.component.html',
    standalone: true,
    styleUrl: './list-cout.component.scss',
})
export class ListCoutComponent implements OnInit,OnDestroy{
    columns: string[] = ['name', 'totalCost', 'orders', 'avgTime', 'costPerOrder'];
    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _coutDeleveryService: DeleveryCoutService,

    )
    {
    }


    ngOnInit(): void {
        this._coutDeleveryService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.data = data;
                console.log(this.data)


            });
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
