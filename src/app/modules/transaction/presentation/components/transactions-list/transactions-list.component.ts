import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Transaction } from '../../../domain/transaction.model';

@Component({
    selector: 'app-transactions-list',
    imports: [
        DecimalPipe,
        FormsModule,
        MatIcon,
        NgForOf,
        NgClass,
    ],
    templateUrl: './transactions-list.component.html',
    standalone: true,
    styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
    private readonly allTransactions = signal<Transaction[]>([
        {
            id: 'T-5932',
            date: '08/05/2024',
            description: 'Paiement Restaurant Chez Michel',
            amount: 745.2,
            status: 'Complété',
            type: 'paiement',
            icon: 'arrow_upward',
        },
        {
            id: 'T-5928',
            date: '07/05/2024',
            description: 'Remboursement commande #4872',
            amount: 28.5,
            status: 'Complété',
            type: 'remboursement',
            icon: 'keyboard_return',
        },
        {
            id: 'T-5921',
            date: '06/05/2024',
            description: 'Paiement Livreur ID-5827',
            amount: 520.75,
            status: 'En attente',
            type: 'paiement',
            icon: 'arrow_upward',
        },
        {
            id: 'T-5915',
            date: '05/05/2024',
            description: 'Abonnement services cloud mensuels',
            amount: 299.99,
            status: 'En cours',
            type: 'abonnement',
            icon: 'description',
        },
        {
            id: 'T-5910',
            date: '04/05/2024',
            description: 'Paiement Restaurant La Brasserie',
            amount: 1250.0,
            status: 'Complété',
            type: 'paiement',
            icon: 'arrow_upward',
        },
    ]);

    // ✅ Search + filter signals
    searchTerm = signal('');
    selectedType = signal('');

    // ✅ Computed filtered list
    readonly transactions = computed(() => {
        return this.allTransactions().filter((t) => {
            const matchesSearch =
                this.searchTerm().trim() === '' ||
                t.description.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
                t.id.toLowerCase().includes(this.searchTerm().toLowerCase());

            const matchesType =
                this.selectedType() === '' || t.type === this.selectedType();

            return matchesSearch && matchesType;
        });
    });

    selectTransaction(transaction: Transaction) {
        console.log('Transaction sélectionnée:', transaction);
        // You can emit an event to a parent component here if needed
    }

    // handlers
    onSearchChange(term: string) {
        this.searchTerm.set(term);
    }

    onTypeChange(type: string) {
        this.selectedType.set(type);
    }

}
