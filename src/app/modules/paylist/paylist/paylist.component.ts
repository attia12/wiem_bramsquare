import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PayrollListComponent } from '../presentation/components/payroll-list/payroll-list.component';
import { PayrollDetailComponent } from '../presentation/components/payroll-detail/payroll-detail.component';

@Component({
    selector: 'app-paylist',
    imports: [
        PayrollListComponent,
        PayrollDetailComponent,
    ],
    templateUrl: './paylist.component.html',
    standalone: true,
    styleUrl: './paylist.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class PaylistComponent {
    selectedPeriod = signal<any | null>(null);


    setSelectedPeriod(value: any) {
        this.selectedPeriod.set(value);
        console.log("------------------",value);
    }


}
