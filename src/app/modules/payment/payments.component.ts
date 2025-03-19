import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PaymentCalendarComponent } from './presentation/components/payment-calendar/payment-calendar.component';
import { ChartComponent } from 'ng-apexcharts';
import { CurrencyPipe } from '@angular/common';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { PaymentMethodsComponent } from './presentation/components/payment-methods/payment-methods.component';


@Component({
    selector: 'app-payments',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PaymentCalendarComponent,
        PaymentMethodsComponent,


    ],
    templateUrl: './payments.component.html',
    styleUrl: './payments.component.scss',

    standalone: true,
})
export class PaymentsComponent {

}
