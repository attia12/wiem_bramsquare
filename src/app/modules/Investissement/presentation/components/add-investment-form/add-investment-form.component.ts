import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-investment-form',
    imports: [
        ReactiveFormsModule,
        MatIcon,
    ],
    templateUrl: './add-investment-form.component.html',
    standalone: true,
    styleUrl: './add-investment-form.component.scss',
})
export class AddInvestmentFormComponent {
    investmentForm: FormGroup;

    constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<AddInvestmentFormComponent>) {
        this.investmentForm = this.fb.group({
            investorName: ['', Validators.required],
            investmentType: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.investmentForm.valid) {
            console.log(this.investmentForm.value);
            this.dialogRef.close(this.investmentForm.value);
        } else {
            this.investmentForm.markAllAsTouched();
        }
    }

    close(): void {
        this.dialogRef.close();

    }

}
