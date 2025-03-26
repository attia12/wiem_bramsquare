import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RapportItemComponent } from '../rapport-item/rapport-item.component';
import { Subject, takeUntil } from 'rxjs';
import { InvestissementService } from '../../../../Investissement/domain/services/investissement.service';
import { RapportService } from '../../../domain/services/rapport.service';

@Component({
    selector: 'app-list-rapport',
    imports: [

        RapportItemComponent,
    ],
    templateUrl: './list-rapport.component.html',
    standalone: true,
    styleUrl: './list-rapport.component.scss',
})
export class ListRapportComponent implements OnInit,OnDestroy{
    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _rapportService: RapportService,

    )
    {
    }


    ngOnInit(): void {
        this._rapportService.data$
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
