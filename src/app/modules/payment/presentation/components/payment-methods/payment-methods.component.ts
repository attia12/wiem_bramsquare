import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatList, MatListItem } from '@angular/material/list';


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

    get currentMethods() {
        switch (this.selectedTab) {
            case 0: return this.paymentMethods.cartes;
            case 1: return this.paymentMethods.mobile;
            case 2: return this.paymentMethods.autres;
            default: return [];
        }
    }

    // Add new payment method (Placeholder function)
    addPaymentMethod() {
        console.log("Ajout d'une nouvelle méthode de paiement");
    }

    // Remove a payment method
    removeMethod(index: number) {
        this.currentMethods.splice(index, 1);
    }

}
