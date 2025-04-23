import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
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
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { InvestorDetailsComponent } from '../../components/investor-details/investor-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


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

        MatIcon,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRowDef,
        MatRow,
        MatIconButton,
        DatePipe,
        MatMenu,
        MatMenuTrigger,
        MatMenuItem,
        MatPaginator,
    ],
    templateUrl: './investor-list.component.html',
    standalone: true,
    styleUrl: './investor-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestorListComponent implements OnInit , OnDestroy, AfterViewInit{
    columns: string[] = [
        'ref',
        'investorName',
        'amount',
        'description',
        'email',
        'typeId',
        'date',
        'actions',
    ];
    data: any;
    paginatedData: any[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _investissementService: InvestissementService,
        private cdr: ChangeDetectorRef,
        private dialog:MatDialog,

    )
    {
    }


    ngOnInit(): void {
        this._investissementService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.data = data.content;
                console.log("the component notified success",this.data)


                this.updatePaginatedData();
                this.cdr.markForCheck();


            });
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    exportAsCSV() {
        this._investissementService.exportCsv();

    }

    exportAsExcel() {
        this._investissementService.exportExcel();

    }

    exportAsPDF() {
        this._investissementService.exportPdf();

    }

    openInvestorDetails(row) {
        console.log(row);
        this.dialog.open(InvestorDetailsComponent, {
            data: row,

        });
    }

    updateInvestor(investor) {

    }

    deleteInvestor(investor) {

    }

    onPageChange(event: any) {
        console.log('Page Changed:', event);
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.paginatedData = this.data.slice(startIndex, endIndex);
        console.log('Paginated data:', this.paginatedData);
    }

    // Update paginated data manually
    updatePaginatedData() {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        const endIndex = startIndex + this.paginator.pageSize;
        this.paginatedData = this.data.slice(startIndex, endIndex);
        console.log("paginated data",this.paginatedData);
    }

    ngAfterViewInit(): void {
        if (this.paginator) {
            this.updatePaginatedData();
        }
    }
}
