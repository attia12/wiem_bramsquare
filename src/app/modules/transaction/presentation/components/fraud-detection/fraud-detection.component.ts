import { Component, Input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Transaction } from '../../../domain/transaction.model';

@Component({
    selector: 'app-fraud-detection',
    imports: [
        MatIcon,
    ],
    templateUrl: './fraud-detection.component.html',
    standalone: true,
    styleUrl: './fraud-detection.component.scss',
})
export class FraudDetectionComponent {
    private _selectedTransaction = signal<Transaction | null>(null);

    @Input({ required: true })
    set selectedTransaction(value: Transaction | null) {
        this._selectedTransaction.set(value);
    }

    get selectedTransaction() {
        return this._selectedTransaction();
    }

}
