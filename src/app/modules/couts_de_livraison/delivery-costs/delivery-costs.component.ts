import { Component, signal } from '@angular/core';
import {  ChartComponent } from 'ng-apexcharts';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ListCoutComponent } from '../presentation/components/list-cout/list-cout.component';
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};

export type PieChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    legend: ApexLegend;
    responsive: ApexResponsive[];
};

@Component({
    selector: 'app-delivery-costs',
    imports: [
        ChartComponent,

        MatIcon,

        NgClass,
        ListCoutComponent,
    ],
    templateUrl: './delivery-costs.component.html',
    standalone: true,
    styleUrl: './delivery-costs.component.scss',
})
export class DeliveryCostsComponent {
    // Signal for selected period
    selectedPeriod = signal<'week' | 'month' | 'year'>('week');

    // Sample data for the charts
    restaurants = [
        'Chez Marcel', 'Brasserie du Marché', 'Le Bistrot Parisien',
        "La Table d'Eugène", 'La Petite Cuisine', 'Le Gourmet', 'Le Café des Artistes'
    ];

    costs = [15, 13, 12.5, 11.2, 10, 9, 8];

    public barChartOptions: Partial<ChartOptions> = {
        series: [{
            name: 'Coût de Livraison',
            data: this.costs
        }],
        chart: {
            type: 'bar',
            height: 300
        },
        xaxis: {
            categories: this.restaurants,
            labels: {
                rotate: -45,
                style: { fontFamily: 'Inter', fontSize: '13px' }
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '45%'
            }
        },
        fill: {
            colors: ['#8B5CF6'] // violet-500
        },
        title: {
            text: ''
        }
    };

    public pieChartOptions: Partial<PieChartOptions> = {
        series: this.costs,
        chart: {
            type: 'pie',
            height: 300
        },
        labels: this.restaurants,
        legend: {
            position: 'right',
            fontSize: '14px',
            fontFamily: 'Inter'
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' }
                }
            }
        ]
    };

    getTotal(): string {
        return this.costs.reduce((sum, val) => sum + val, 0).toFixed(2);
    }

    setPeriod(period: 'week' | 'month' | 'year') {
        this.selectedPeriod.set(period);
        // You can reload new data depending on the selected period here
    }

    isSelected(period: 'week' | 'month' | 'year'): boolean {
        return this.selectedPeriod() === period;
    }


}
