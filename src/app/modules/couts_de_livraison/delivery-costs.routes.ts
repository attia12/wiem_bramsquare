import { Routes } from '@angular/router';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { inject } from '@angular/core';

import { DeleveryCoutService } from './domain/services/delevery-cout.service';



export default [
    {
        path: '',
        component: DeliveryCostsComponent,
        resolve  : {
            data: () => inject(DeleveryCoutService).getData(),
        },
    },
] as Routes;
