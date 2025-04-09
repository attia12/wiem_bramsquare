import { Routes } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { inject } from '@angular/core';

import { PaymentService } from './domain/services/payment.service';


export default [
    {
        path: '',
        component: PaymentsComponent,
        resolve  : {
            data: () => inject(PaymentService).getData(),
        },
    },
] as Routes;
