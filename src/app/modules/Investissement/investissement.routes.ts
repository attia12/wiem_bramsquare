import { Routes } from '@angular/router';
import { InvestissementComponent } from './investissement.component';
import { inject } from '@angular/core';
import { InvestissementService } from './domain/services/investissement.service';



export default [
    {
        path: '',
        component: InvestissementComponent,
        resolve  : {
            data: () => inject(InvestissementService).getData(),
        },
    },
] as Routes;
