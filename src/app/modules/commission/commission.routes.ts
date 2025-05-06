import { Routes } from '@angular/router';
import { CommissionComponent } from './commission/commission.component';
import { initialDataResolver } from './commition.resolvers';





export default [
    {
        path: '',
        component: CommissionComponent,
        resolve: {
            initialData: initialDataResolver
        },
    },
] as Routes;
