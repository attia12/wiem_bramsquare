import { ChangeDetectionStrategy, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';

import { Subject, takeUntil } from 'rxjs';
import { RapportService } from '../../../domain/services/rapport.service';
import { ToastService } from '../../../../../../common/services/toast.service';




@Component({
    selector: 'app-list-commision',
    imports: [
        FormsModule,
        MatIcon,
        DecimalPipe,
        MatIconButton,
        NgIf,

    ],
    templateUrl: './list-commision.component.html',
    standalone: true,
    styleUrl: './list-commision.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListCommisionComponent implements OnInit ,OnDestroy{
    editMode = signal(false);
    search = signal('');
    sort = signal('asc');



    private _unsubscribeAll: Subject<any> = new Subject<any>();

    data = signal([

    ]);

    // filteredData = computed(() => {
    //     let list = this.data();
    //     const query = this.search().toLowerCase();
    //     if (query) {
    //         list = list.filter(item => item.nom.toLowerCase().includes(query) || item.specialite.toLowerCase().includes(query));
    //     }
    //     if (this.sort() === 'asc') {
    //         list = list.sort((a, b) => a.nom.localeCompare(b.nom));
    //     } else {
    //         list = list.sort((a, b) => b.nom.localeCompare(a.nom));
    //     }
    //     return list;
    // });
    filteredData = computed(() => {
        let list = this.data();
        const query = this.search().toLowerCase();

        if (query) {
            list = list.filter(item =>
                (item.nom?.toLowerCase() ?? '').includes(query) ||
                (item.specialite?.toLowerCase() ?? '').includes(query)
            );
        }

        if (this.sort() === 'asc') {
            list = list.sort((a, b) => (a.nom?.toLowerCase() ?? '').localeCompare(b.nom?.toLowerCase() ?? ''));
        } else {
            list = list.sort((a, b) => (b.nom?.toLowerCase() ?? '').localeCompare(a.nom?.toLowerCase() ?? ''));
        }

        return list;
    });
  constructor(private _rapportService: RapportService,private _toastService: ToastService) {
  }
    refresh() {
        console.log('🔄 Refresh clicked');
    }

    modifyRates() {
        this.editMode.update(value => !value);
    }
    ngOnInit(): void {
        this._rapportService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {

                this.data.set(data);
                console.log("-----------",this.data())



            });
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    exportPdfForOneRestaurant(item: any): void {
      console.log("item",item)
        if (!item || !item.id) {
            this._toastService.showToast('error', 'ID du restaurant manquant.', 'Erreur');
            return;
        }

        this._rapportService.exportToPdfByRestaurantId(item.id).subscribe({
            next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');

                this._toastService.showToast('success', `PDF généré pour ${item.nom}`, 'Succès');
            },
            error: (err) => {
                console.error('❌ Erreur lors de la génération du PDF', err);
                this._toastService.showToast('error', `Impossible de générer le PDF pour ${item.nom}`, 'Erreur');
            }
        });
    }
}
