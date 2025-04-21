import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import {  MatIconButton } from '@angular/material/button';


@Component({
    selector: 'app-add-payment-method',
    imports: [

        ReactiveFormsModule,
        MatIcon,
        MatIconButton,


    ],
    templateUrl: './add-payment-method.component.html',
    standalone: true,
    styleUrl: './add-payment-method.component.scss',
})
export class AddPaymentMethodComponent {
    paymentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddPaymentMethodComponent>
    ) {
        this.paymentForm = this.fb.group({
            cardNumber: ['', [Validators.required, Validators.minLength(16)]],
            cardName: ['', Validators.required],
            expiryDate: ['', Validators.required],
            cvc: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    addPayment() {
        if (this.paymentForm.valid) {
            this.dialogRef.close(this.paymentForm.value);
        }
    }

    closeModal() {
        this.dialogRef.close();
    }

}
