import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading',
    imports: [
        NgIf,
        AsyncPipe,
        MatProgressSpinnerModule,
    ],
    templateUrl: './loading.component.html',
    standalone: true,
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    constructor(public loadingService: LoadingService) {

    }



}
