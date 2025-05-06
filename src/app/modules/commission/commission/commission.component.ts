import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgClass } from '@angular/common';
import { CommissionReportsComponent } from '../presentation/pages/commission-reports/commission-reports.component';
import { ListCommisionComponent } from '../presentation/components/list-commision/list-commision.component';
import {
    CommissionAnalysisComponent
} from '../presentation/components/commission-analysis/commission-analysis.component';
import { PdfViewerComponent } from '../presentation/pages/pdf-viewer/pdf-viewer.component';
import { RapportService } from '../domain/services/rapport.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../common/services/toast.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'app-commission',
    imports: [
        MatIcon,
        MatButtonToggleGroup,
        MatButtonToggle,
        NgClass,
        CommissionReportsComponent,
        ListCommisionComponent,
        CommissionAnalysisComponent,
    ],
    templateUrl: './commission.component.html',
    standalone: true,
    styleUrl: './commission.component.scss',
})
export class CommissionComponent implements OnInit,OnDestroy{
    selectedTab = signal<'regles' | 'analyse' | 'rapports'>('regles');
    dataRevenuTotal: any;
    dataCommissionRevenueTotal: any;
    dataAverageCommissionRateTotal: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _rapportService: RapportService,public dialog: MatDialog,private toastr:ToastService, private cdr: ChangeDetectorRef,) {
    }

    selectTab(tab: 'regles' | 'analyse' | 'rapports') {
        this.selectedTab.set(tab);
    }
    exportTableToPdf(): void {
        this._rapportService.exportToPdf().subscribe({
            next: (response) => {

                this.toastr.showToast('success', 'PDF export was successful!', 'Success');
                const url = window.URL.createObjectURL(response);
                this.dialog.open(PdfViewerComponent, {
                    data: { pdfUrl: url },
                    width: '80%',
                    height: '80%',
                });
            },
            error: (error) => {

                this.toastr.showToast('error', 'An error occurred while exporting the PDF.', 'Error');
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {
        this._rapportService.totalRevenue$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.dataRevenuTotal = data;




                this.cdr.markForCheck();


            });
        this._rapportService.totalCommissionRevenue$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.dataCommissionRevenueTotal = data;




                this.cdr.markForCheck();


            });
        this._rapportService.totalAverageCommissionRate$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.dataAverageCommissionRateTotal = data;




                this.cdr.markForCheck();


            });
    }

}
