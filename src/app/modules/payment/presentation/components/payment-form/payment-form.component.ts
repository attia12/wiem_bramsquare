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
export class PaymentFormComponent implements OnInit,OnChanges {
    @Output() closeForm = new EventEmitter<void>();
    @Input() mode: 'add' | 'edit' = 'add';
    @Input() paymentToEdit: Payment | null = null;


    payment: Payment = {
        amount: 0,
        date: new Date(),
        method: PaymentMethod.CREDIT_CARD,
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
    get dateString(): string {
        return this.payment.date ? new Date(this.payment.date).toISOString().split('T')[0] : '';
    }

    set dateString(value: string) {
        this.payment.date = new Date(value);
    }



    handleClose() {
        this.closeForm.emit();
    }

    // handleSave() {
    //     if (!this.isValid()) return;
    //
    //     this.isLoading = true;
    //
    //
    //     this.paymentService.savePayment(this.payment).subscribe({
    //         next: () => {
    //             this.isLoading = false;
    //             this.closeForm.emit();
    //         },
    //         error: (err) => {
    //             console.error('Erreur lors de l\'enregistrement :', err);
    //             this.isLoading = false;
    //         }
    //     });
    // }

    handleSave() {
        if (!this.isValid()) return;

        this.isLoading = true;

        const request = this.mode === 'edit'
            ? this.paymentService.updatePayment(this.payment)
            : this.paymentService.savePayment(this.payment);

        request.subscribe({
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
    private clearTime(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    // isValid(): boolean {
    //
    //     if (this.mode === 'edit') {
    //         return true;
    //     }
    //
    //     const now = new Date();
    //     const isFutureDate = new Date(this.payment.date) >= now;
    //
    //     this.errors = {
    //         date: !isFutureDate,
    //         beneficiary: !this.payment.beneficiary,
    //         amount: !(this.payment.amount > 0),
    //         type: !this.payment.type,
    //         status: !this.payment.status,
    //         recurrenceEndDate: this.payment.recurring &&
    //             this.payment.recurrenceEndDate &&
    //             new Date(this.payment.recurrenceEndDate) <= new Date(this.payment.date)
    //     };
    //
    //     return !Object.values(this.errors).some(Boolean);
    // }
    isValid(): boolean {
        if (this.mode === 'edit') return true;

        const now = new Date();

        const clearTime = (date: Date): Date =>
            new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const isFutureDate = clearTime(new Date(this.payment.date)) >= clearTime(now);

        this.errors = {
            date: !isFutureDate,
            beneficiary: !this.payment.beneficiary,
            amount: !(this.payment.amount > 0),
            type: !this.payment.type,
            status: !this.payment.status,
            recurrenceEndDate: this.payment.recurring &&
                this.payment.recurrenceEndDate &&
                clearTime(new Date(this.payment.recurrenceEndDate)) <= clearTime(new Date(this.payment.date))
        };

        return !Object.values(this.errors).some(Boolean);
    }


    ngOnInit(): void {

        console.log("PAYMENT TO EDIT:", this.paymentToEdit);
        if (this.mode === 'edit' && this.paymentToEdit) {
            this.payment = {
                amount: this.paymentToEdit.amount,
                date: new Date(this.paymentToEdit.date),
                method: this.paymentToEdit.method,
                beneficiary: this.paymentToEdit.beneficiary,
                status: this.paymentToEdit.status,
                type: this.paymentToEdit.type,
                recurring: false,
                recurrenceEndDate: null,
                recurrenceType: null
            };
        } else {
            this.payment = {
                amount: 0,
                date: new Date(),
                method: PaymentMethod.CREDIT_CARD,
                status: PaymentStatus.PENDING,
                type: PaymentType.BILL,
                beneficiary: '',
                recurring: false
            };
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['paymentToEdit'] && this.mode === 'edit' && this.paymentToEdit) {
            this.payment = {
                amount: this.paymentToEdit.amount,
                date: new Date(this.paymentToEdit.date),
                method: this.paymentToEdit.method,
                beneficiary: this.paymentToEdit.beneficiary,
                status: this.paymentToEdit.status,
                type: this.paymentToEdit.type,
                recurring: false,
                recurrenceEndDate: null,
                recurrenceType: null
            };
        }
    }


}
