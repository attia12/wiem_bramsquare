import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Payment, PaymentMethod, PaymentStatus, PaymentType } from '../../../domain/model/payment';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { PaymentService } from '../../../domain/services/payment.service';
import { LoadingComponent } from '../../../../../../common/components/loading/loading.component';

@Component({
    selector: 'app-payment-form',
    imports: [
        FormsModule,
        MatIcon,
        MatSlideToggle,
        LoadingComponent,
    ],
    templateUrl: './payment-form.component.html',
    standalone: true,
    styleUrl: './payment-form.component.scss',

})
export class PaymentFormComponent  {
    @Output() closeForm = new EventEmitter<void>();


    payment: Payment = {
        amount: 0,
        date: new Date(),
        method: PaymentMethod.CARD,
        status: PaymentStatus.PENDING,
        type: PaymentType.BILL,
        beneficiary: '',
        recurring: false
    };
    isLoading = false;
    errors = {
        date: false,
        beneficiary: false,
        amount: false,
        type: false,
        status: false,
        recurrenceEndDate: false
    };
    constructor(private paymentService:PaymentService) {

    }


    handleClose() {
        this.closeForm.emit();
    }

    handleSave() {
        if (!this.isValid()) return;

        this.isLoading = true;


        this.paymentService.savePayment(this.payment).subscribe({
            next: () => {
                this.isLoading = false;
                this.closeForm.emit();
            },
            error: (err) => {
                console.error('Erreur lors de l\'enregistrement :', err);
                this.isLoading = false;
            }
        });
    }
    isValid(): boolean {
        const now = new Date();
        const isFutureDate = new Date(this.payment.date) > now;

        this.errors = {
            date: !isFutureDate,
            beneficiary: !this.payment.beneficiary,
            amount: !(this.payment.amount > 0),
            type: !this.payment.type,
            status: !this.payment.status,
            recurrenceEndDate: this.payment.recurring &&
                this.payment.recurrenceEndDate &&
                new Date(this.payment.recurrenceEndDate) <= new Date(this.payment.date)
        };

        return !Object.values(this.errors).some(Boolean);
    }


}
