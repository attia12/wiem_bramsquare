import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { InvestmentType } from '../../../domain/models/investment-type';
import { TypesDinvestissementService } from '../../../domain/services/types-dinvestissement.service';
import { InvestissementService } from '../../../domain/services/investissement.service';


@Component({
    selector: 'app-add-investment-form',
    imports: [
        ReactiveFormsModule,
        MatIcon,
    ],
    templateUrl: './add-investment-form.component.html',
    standalone: true,
    styleUrl: './add-investment-form.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddInvestmentFormComponent implements OnInit{
    investmentForm: FormGroup;
    investmentTypes = signal<InvestmentType[]>([]);
    selectedInvestmentType = signal<string>('');
    selectedInvestmentFields = signal<any>({});

    constructor(private investissementService:InvestissementService,private fb: FormBuilder,private dialogRef: MatDialogRef<AddInvestmentFormComponent>, private typesService: TypesDinvestissementService) {
        this.investmentForm = this.fb.group({
            investorName: ['', Validators.required],
            investmentType: ['', Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],  // Amount field added
            email: ['', [Validators.required, Validators.email]],  // Email field added
            description: ['', [Validators.maxLength(255)]],  // Description field added with a max length
        });
    }

    onSubmit(): void {
        if (this.investmentForm.valid) {
            const formValue = this.investmentForm.value;

            // Ensure numeric fields are treated as numbers
            const formattedValue = {
                amount: formValue.amount,
                description: formValue.description,
                email: formValue.email,
                typeId: this.selectedInvestmentType(), // Use the selected investment type ID
                investorName: formValue.investorName,
                fields: {} // Initialize fields as an empty object
            };

            // Loop through dynamic fields and add them to the 'fields' object
            Object.keys(this.selectedInvestmentFields()).forEach((key) => {
                // Convert the field value to a number if it's numeric
                if (typeof formValue[key] === 'string' && !isNaN(Number(formValue[key]))) {
                    formattedValue.fields[key] = Number(formValue[key]); // Convert string to number
                } else {
                    formattedValue.fields[key] = formValue[key];
                }
            });

            // Log the formatted values for debugging
            console.log('Formatted Form Data:', formattedValue);

            // Call addInvestment service method to add the investment
            this.investissementService.addInvestment(formattedValue).subscribe({
                next: (response) => {
                    console.log('Investment added successfully:', response);
                    this.dialogRef.close(response);  // Close dialog and pass the response back
                },
                error: (err) => {
                    console.error('Error adding investment:', err);
                },
            });
        } else {
            // Show validation errors
            this.investmentForm.markAllAsTouched();
        }
    }




    close(): void {
        this.dialogRef.close();

    }

    ngOnInit(): void {
        this.loadTypeInvestment();
    }

    private loadTypeInvestment() {
        this.typesService.getData().subscribe({
            next: (data) => {
                this.investmentTypes.set(data);
                console.log("investisement type", this.investmentTypes());
            },
            error: (err) => console.error('Error fetching investment types', err),
        });
    }
    onInvestmentTypeChange(selectedType: string): void {
        this.selectedInvestmentType.set(selectedType); // Update the selected type
        const selectedTypeData = this.investmentTypes().find((type) => type.name === selectedType);
       console.log("the selected type data",selectedTypeData)
        if (selectedTypeData) {
            this.selectedInvestmentType.set(selectedTypeData.id);
            this.selectedInvestmentFields.set(selectedTypeData.fields); // Set the fields based on the selected type
            this.addDynamicFields(); // Add dynamic fields to the form
        }
    }

    private addDynamicFields() {
        // Reset dynamic fields first
        Object.keys(this.selectedInvestmentFields()).forEach((key) => {
            this.investmentForm.removeControl(key);
        });

        // Add the dynamic fields to the form
        Object.keys(this.selectedInvestmentFields()).forEach((key) => {
            const fieldConfig = this.selectedInvestmentFields()[key];
            this.investmentForm.addControl(key, this.fb.control('', Validators.required)); // Add control with validation
        });
    }

    protected readonly Object = Object;
}
