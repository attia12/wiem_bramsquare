import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-payroll-list',
    imports: [
        NgForOf,
        NgClass,
        MatIcon,
    ],
    templateUrl: './payroll-list.component.html',
    standalone: true,
    styleUrl: './payroll-list.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush

})
export class PayrollListComponent {
    selectedPeriod = input<string | null>();

    // 🔽 Signal-based Output
    selected = output<any>();

    // 🔽 Static document data
    documents = signal([
        {
            month: 'Janvier 2024',
            role: 'Administrateur',
            status: 'Payé',
            color: 'bg-green-100 text-green-700',
        },
        {
            month: 'Février 2024',
            role: 'Administrateur',
            status: 'Payé',
            color: 'bg-green-100 text-green-700',
        },
        {
            month: 'Mars 2024',
            role: 'Administrateur',
            status: 'Payé',
            color: 'bg-green-100 text-green-700',
        },
        {
            month: 'Avril 2024',
            role: 'Administrateur',
            status: 'En attente',
            color: 'bg-yellow-100 text-yellow-700',
        }
    ]);

    // 🔽 Internal signal to manage selection
    selectedMonth = signal<string | null>(null);

    selectDocument(doc: any) {
        this.selectedMonth.set(doc.month);
        this.selected.emit(doc); // Emit via signal output
    }

}
