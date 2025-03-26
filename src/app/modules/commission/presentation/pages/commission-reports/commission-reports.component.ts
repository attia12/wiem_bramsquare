import { Component } from '@angular/core';
import {
    PlanifierRapportFormComponent
} from '../../components/planifier-rapport-form/planifier-rapport-form.component';
import { ListRapportComponent } from '../../components/list-rapport/list-rapport.component';

@Component({
    selector: 'app-commission-reports',
    imports: [
        PlanifierRapportFormComponent,
        ListRapportComponent,
    ],
    templateUrl: './commission-reports.component.html',
    standalone: true,
    styleUrl: './commission-reports.component.scss',
})
export class CommissionReportsComponent {

}
