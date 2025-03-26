import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentMethodComponent } from '../add-payment-method/add-payment-method.component';


@Component({
    selector: 'app-payment-methods',
    imports: [
        MatIcon,
        MatButton,
        MatTabGroup,
        MatTab,
        MatList,

        MatListItem,
        MatIconButton,

    ],
    templateUrl: './payment-methods.component.html',
    standalone: true,
    styleUrl: './payment-methods.component.scss',
})
export class PaymentMethodsComponent {
    selectedTab = 0; // Default selected tab (Cartes)
    paymentMethods = {
        cartes: [
            { icon: 'credit_card', name: 'PayPal Business', details: 'finance@entreprise.fr' }
        ],
        mobile: [
            { icon: 'phone_android', name: 'Orange Money', details: '+33 6 12 34 56 78' }
        ],
        autres: [
            { icon: 'account_balance_wallet', name: 'Stripe Business', details: 'stripe@business.com' }
        ]
    };
    constructor(public dialog: MatDialog) {}

    get currentMethods() {
        switch (this.selectedTab) {
            case 0: return this.paymentMethods.cartes;
            case 1: return this.paymentMethods.mobile;
            case 2: return this.paymentMethods.autres;
            default: return [];
        }
    }




    // Remove a payment method
    removeMethod(index: number) {
        this.currentMethods.splice(index, 1);
    }

    openAddPaymentModal() {
        const dialogRef = this.dialog.open(AddPaymentMethodComponent, {
            width: '450px',
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.currentMethods.push(result);
            }
        });

    }
}
