import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { InvestmentType } from '../../../domain/models/investment-type';
import { MatIcon } from '@angular/material/icon';
import {
    CreateInvestmentTypeComponent
} from '../../components/create-investment-type/create-investment-type.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { TypesDinvestissementService } from '../../../domain/services/types-dinvestissement.service';



@Component({
    selector: 'app-type-investissement',
    imports: [
        MatIcon,
        NgIf,

    ],
    templateUrl: './type-investissement.component.html',
    standalone: true,
    styleUrl: './type-investissement.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeInvestissementComponent implements OnInit{

    constructor(private dialog: MatDialog,private typesDinvestissementService: TypesDinvestissementService) {
    }

    investmentTypes = signal<InvestmentType[]>([

    ]);



    onConfigure(type: string) {
        console.log(`Configuring: ${type}`);
    }

    openModalAddType(): void {
        const dialogRef = this.dialog.open(CreateInvestmentTypeComponent, {
            width: '700px',


        });

        dialogRef.componentInstance.save.subscribe((result:any) => {
            console.log('Saved investment type:', result);
            this.addInvestmentTypeToList(result);
            dialogRef.close();
            // Optionally add to your list
        });

        dialogRef.componentInstance.close.subscribe(() => {
            dialogRef.close();
        });
    }

    protected readonly Object = Object;

    addInvestmentTypeToList(newInvestmentType: InvestmentType) {
        this.investmentTypes.update(current => [...current, newInvestmentType]);
    }
    fetchInvestmentTypes() {
        this.typesDinvestissementService.getData().subscribe(data => {
            this.investmentTypes.set(data);
            console.log("Data fetched:", data);
        });
    }

    ngOnInit() {
        this.fetchInvestmentTypes(); // Fetch the data on component load
    }
}
