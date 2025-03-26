import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ChartComponent } from 'ng-apexcharts';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-trend-analysis',
    imports: [
        MatButtonToggleGroup,
        MatButtonToggle,
        ChartComponent,
        MatIcon,
    ],
    templateUrl: './trend-analysis.component.html',
    standalone: true,
    styleUrl: './trend-analysis.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TrendAnalysisComponent {
    selectedTab = signal('finance');

    selectTab(value: string) {
        this.selectedTab.set(value);
    }
    chartSeries = [
        {
            name: 'Investissement',
            type: 'area',
            data: [470000, 480000, 490000, 500000, 510000, 520000, 530000, 540000, 550000, 560000, 570000, 580000]
        },
        {
            name: 'Revenus',
            type: 'line',
            data: [65000, 72000, 75000, 80000, 85000, 86000, 88000, 87000, 89000, 85000, 82000, 86000]
        },
        {
            name: 'Profit',
            type: 'area',
            data: [60000, 67000, 70000, 74000, 78000, 79000, 80000, 79000, 80000, 76000, 73000, 77000]
        }
    ];

    chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [2, 2, 2],
            curve: 'smooth'
        },
        colors: ['#6366f1', '#22c55e', '#f97316'],
        xaxis: {
            categories: [
                'avr. 2024', 'mai 2024', 'juin 2024', 'juil. 2024',
                'août 2024', 'sept. 2024', 'oct. 2024', 'nov. 2024',
                'déc. 2024', 'janv. 2025', 'févr. 2025', 'mars 2025'
            ]
        },
        yaxis: [
            {
                title: {
                    text: 'Montant (€)'
                }
            }
        ],
        legend: {
            position: 'bottom'
        }
    };

}
