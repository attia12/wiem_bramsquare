import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-payment-form',
    imports: [],
    templateUrl: './payment-form.component.html',
    standalone: true,
    styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
    @Output() closeForm = new EventEmitter<void>();

    handleClose() {
        this.closeForm.emit();
    }

    handleSave() {
        console.log("Saving payment...");
        this.closeForm.emit();
    }

}
