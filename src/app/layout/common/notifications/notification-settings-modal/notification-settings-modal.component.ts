import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-notification-settings-modal',
    imports: [
        MatSlider,
        MatButton,
        MatSliderThumb,
        NgStyle,
    ],
    templateUrl: './notification-settings-modal.component.html',
    styleUrl: './notification-settings-modal.component.scss',
    standalone: true,

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSettingsModalComponent {
    factureDays = signal(9);
    salairesDays = signal(2);
    taxesDays = signal(3);
    abonnementsDays = signal(4);

    constructor(
        private dialogRef: MatDialogRef<NotificationSettingsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.dialogRef.close({
            facture: this.factureDays(),
            salaires: this.salairesDays(),
            taxes: this.taxesDays(),
            abonnements: this.abonnementsDays()
        });
    }

}
