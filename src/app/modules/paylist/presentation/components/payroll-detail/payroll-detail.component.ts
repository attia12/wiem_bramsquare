import { Component, computed, effect, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-payroll-detail',
    imports: [
        MatIcon,
        DecimalPipe,
    ],
    templateUrl: './payroll-detail.component.html',
    standalone: true,
    styleUrl: './payroll-detail.component.scss',
})
export class PayrollDetailComponent {
    readonly document = input<any | null>();

    // Reactive computed details
    details = computed(() => {
        const doc = this.document();
        if (!doc) return null;

        return {
            date: '31/01/2024',
            status: doc.status,
            role: doc.role,
            base: 3000.0,
            bonus: 500.0,
            tax: -299.5,
            net: 3200.5,
        };
    });

    // Optional debug: log when it updates
    constructor() {
        effect(() => {
            console.log('Document changed:', this.document());
        });
    }

}
