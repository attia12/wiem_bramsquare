import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgClass } from '@angular/common';
import { CommissionReportsComponent } from '../presentation/pages/commission-reports/commission-reports.component';

@Component({
    selector: 'app-commission',
    imports: [
        MatIcon,
        MatButtonToggleGroup,
        MatButtonToggle,
        NgClass,
        CommissionReportsComponent,
    ],
    templateUrl: './commission.component.html',
    standalone: true,
    styleUrl: './commission.component.scss',
})
export class CommissionComponent {
    selectedTab = signal<'regles' | 'analyse' | 'rapports'>('regles');

    selectTab(tab: 'regles' | 'analyse' | 'rapports') {
        this.selectedTab.set(tab);
    }

}
