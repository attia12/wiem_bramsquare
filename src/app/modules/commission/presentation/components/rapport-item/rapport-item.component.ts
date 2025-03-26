import { Component, input, Input, signal } from '@angular/core';
import { Rapport } from '../../../domain/models/rapport';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-rapport-item',
    imports: [
        MatIcon,
    ],
    templateUrl: './rapport-item.component.html',
    standalone: true,
    styleUrl: './rapport-item.component.scss',
})
export class RapportItemComponent {
    rapport = input.required<Rapport>();


    onDownload() {

    }
}
