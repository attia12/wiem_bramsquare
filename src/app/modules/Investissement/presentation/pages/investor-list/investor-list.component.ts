import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { InvestissementService } from '../../../domain/services/investissement.service';
import { Subject, takeUntil } from 'rxjs';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
} from '@angular/material/table';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-investor-list',
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCell,
        MatCellDef,
        DecimalPipe,
        NgClass,
        MatIcon,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRowDef,
        MatRow,
        MatIconButton,
    ],
    templateUrl: './investor-list.component.html',
    standalone: true,
    styleUrl: './investor-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestorListComponent implements OnInit , OnDestroy{
    columns: string[] = [
        'nom',
        'montant',
        'type',
        'roiAttendu',
        'roiActuel',
        'revenus',
        'performance',
        'actions'
    ];
    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _investissementService: InvestissementService,

    )
    {
    }


    ngOnInit(): void {
        this._investissementService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.data = data.content;
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
