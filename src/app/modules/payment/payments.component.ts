import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PaymentCalendarComponent } from './presentation/components/payment-calendar/payment-calendar.component';

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
