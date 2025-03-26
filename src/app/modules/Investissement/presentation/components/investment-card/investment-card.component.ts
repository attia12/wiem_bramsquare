import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-investment-card',
    imports: [
        MatIcon,
        MatIconButton,
        NgClass,
    ],
    templateUrl: './investment-card.component.html',
    standalone: true,
    styleUrl: './investment-card.component.scss',
})
export class InvestmentCardComponent {
    @Input() label: string = '';
    @Input() value: string = '';
    @Input() description: string = '';
    @Input() trend: string = '';
    @Input() trendColor: 'text-green-500' | 'text-red-500' = 'text-green-500';

}
