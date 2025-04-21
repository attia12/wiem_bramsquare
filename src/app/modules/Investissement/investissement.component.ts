import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { InvestmentCardComponent } from './presentation/components/investment-card/investment-card.component';
import { MatIcon } from '@angular/material/icon';

import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { InvestorListComponent } from './presentation/pages/investor-list/investor-list.component';
import { TrendAnalysisComponent } from './presentation/pages/trend-analysis/trend-analysis.component';
import { MatDialog } from '@angular/material/dialog';
import {
    AddInvestmentFormComponent
} from './presentation/components/add-investment-form/add-investment-form.component';
import { TypeInvestissementComponent } from './presentation/pages/type-investissement/type-investissement.component';

@Component({
    selector: 'app-investissement',
    imports: [
        MatButton,
        InvestmentCardComponent,
        MatIcon,
        MatButtonToggleGroup,
        MatButtonToggle,
        DashboardComponent,
        InvestorListComponent,
        TrendAnalysisComponent,
        TypeInvestissementComponent,


    ],
    templateUrl: './investissement.component.html',
    standalone: true,
    styleUrl: './investissement.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestissementComponent {
     dialog=inject(MatDialog) ;
    cards = signal([
        {
            label: 'Investissement Total',
            value: '625000 €',
            description: 'Montant total investi par les partenaires',
            trend: '',
            trendColor: 'text-green-500'
        },
        {
            label: 'Revenus Générés',
            value: '99500 €',
            description: 'vs mois précédent',
            trend: '↑ 12.5%',
            trendColor: 'text-green-500'
        },
        {
            label: 'ROI Moyen',
            value: '16.7%',
            description: 'vs ROI cible de 15%',
            trend: '↑ 2.3%',
            trendColor: 'text-green-500'
        },
        {
            label: 'Performance',
            value: '60%',
            description: 'Partenaires au-dessus de l\'objectif',
            trend: '↑ 5%',
            trendColor: 'text-green-500'
        }
    ]);
    selectedTab = signal<'dashboard' | 'investors' | 'trends' | 'recommendations' | 'type_investissement'>('dashboard');
    selectTab(tab: 'dashboard' | 'investors' | 'trends' | 'recommendations'|'type_investissement') {
        this.selectedTab.set(tab);
    }

    openAddInvestment() {
        const dialogRef = this.dialog.open(AddInvestmentFormComponent, {
            width: '500px',

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Investissement ajouté :', result);

            }
        });

    }
}
