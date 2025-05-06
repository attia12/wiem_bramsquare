import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {  NgChartsModule } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);
@Component({
    selector: 'app-commission-analysis',
    imports: [

        NgChartsModule,
    ],
    templateUrl: './commission-analysis.component.html',
    standalone: true,
    styleUrl: './commission-analysis.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CommissionAnalysisComponent {

    pieData = signal([
        { name: 'Fast Food', value: 28, color: '#3B82F6' },
        { name: 'Pizza', value: 22, color: '#14B8A6' },
        { name: 'Sushi', value: 15, color: '#FBBF24' },
        { name: 'Vegan', value: 10, color: '#F97316' },
        { name: 'Italian', value: 12, color: '#8B5CF6' },
        { name: 'Mexican', value: 8, color: '#F87171' },
        { name: 'Dessert', value: 5, color: '#86EFAC' },
    ]);

    barData = signal([
        { month: 'Jan', revenue: 13000, commission: 1000 },
        { month: 'Feb', revenue: 14500, commission: 1100 },
        { month: 'Mar', revenue: 18000, commission: 1200 },
        { month: 'Apr', revenue: 21000, commission: 1400 },
        { month: 'May', revenue: 19000, commission: 1350 },
        { month: 'Jun', revenue: 21500, commission: 1500 },
        { month: 'Jul', revenue: 22000, commission: 1550 },
        { month: 'Aug', revenue: 26000, commission: 1600 },
        { month: 'Sep', revenue: 24000, commission: 1550 },
        { month: 'Oct', revenue: 25000, commission: 1600 },
        { month: 'Nov', revenue: 25000, commission: 1620 },
        { month: 'Dec', revenue: 28000, commission: 1700 },
    ]);

    pieChartData = computed<ChartData<'pie', number[], string>>(() => ({
        labels: this.pieData().map(d => d.name),
        datasets: [{
            data: this.pieData().map(d => d.value),
            backgroundColor: this.pieData().map(d => d.color)
        }]
    }));
    pieChartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 40,
                bottom: 30, // 👈 Add extra space BELOW the chart
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 12 },
                    color: '#6B7280',
                    padding: 20, // 👈 Add space INSIDE the legend items
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        return label;
                    }
                }
            },
            datalabels: {
                color: '#4B5563',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: (value: any, context: any) => {
                    return context.chart.data.labels?.[context.dataIndex] ?? '';
                },
                anchor: 'end',
                align: 'end',
                offset: 10,
            }
        },
        cutout: '70%',
    };

    barChartData = computed<ChartData<'bar', number[], string>>(() => ({
        labels: this.barData().map(d => d.month),
        datasets: [
            {
                label: "Chiffre d'affaires",
                data: this.barData().map(d => d.revenue),
                backgroundColor: '#8B5CF6'
            },
            {
                label: "Commission",
                data: this.barData().map(d => d.commission),
                backgroundColor: '#34D399'
            }
        ]
    }));

    barChartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280', // Tailwind gray
                    font: { size: 12 }
                }
            },
            x: {
                ticks: {
                    color: '#6B7280',
                    font: { size: 12 }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#6B7280',
                    font: { size: 12 }
                }
            }
        }
    };

    partnerPerformanceData = signal([
        { partner: 'Asian Fusion', revenue: 19000, commission: 1500 },
        { partner: 'Burger Supreme', revenue: 17000, commission: 1400 },
        { partner: 'Gourmet Burgers', revenue: 20000, commission: 1550 },
        { partner: 'Green Garden', revenue: 15000, commission: 1200 },
        { partner: 'Morning Delights', revenue: 13000, commission: 1000 },
        { partner: 'Pasta Paradise', revenue: 22000, commission: 1600 },
        { partner: 'Pizza Palace', revenue: 21000, commission: 1580 },
        { partner: 'Sushi Express', revenue: 18000, commission: 1400 },
    ]);

    partnerPerformanceChartData = computed<ChartData<'bar', number[], string>>(() => ({
        labels: this.partnerPerformanceData().map(d => d.partner),
        datasets: [
            {
                label: "Chiffre d'affaires",
                data: this.partnerPerformanceData().map(d => d.revenue),
                backgroundColor: '#8B5CF6'
            },
            {
                label: "Taux de commission",
                data: this.partnerPerformanceData().map(d => d.commission),
                backgroundColor: '#34D399'
            }
        ]
    }));

    partnerPerformanceChartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y', // <-- this makes it horizontal
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280',
                    font: { size: 12 }
                }
            },
            y: {
                ticks: {
                    color: '#6B7280',
                    font: { size: 12 }
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#6B7280',
                    font: { size: 12 },
                    padding: 20
                }
            }
        }
    };

}
