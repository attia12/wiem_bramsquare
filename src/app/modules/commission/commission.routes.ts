import { Routes } from '@angular/router';
import { CommissionComponent } from './commission/commission.component';
import { inject } from '@angular/core';

import { RapportService } from './domain/services/rapport.service';




export default [
    {
        path: '',
        component: CommissionComponent,
        resolve  : {
            data: () => inject(RapportService).getData(),
        },
    },
] as Routes;
