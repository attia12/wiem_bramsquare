import { inject } from '@angular/core';

import { forkJoin } from 'rxjs';
import { RapportService } from './domain/services/rapport.service';

export const initialDataResolver = () => {


    const rapportService = inject(RapportService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        rapportService.getData(),
       rapportService.getAverageCommissionRate(),

       rapportService.getTotalCommissionRevenue(),
        rapportService.getTotalRevenue(),
    ]);
};
