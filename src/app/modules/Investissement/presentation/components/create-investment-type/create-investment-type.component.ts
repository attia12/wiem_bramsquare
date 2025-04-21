import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { MatIconButton } from '@angular/material/button';
import { TypesDinvestissementService } from '../../../domain/services/types-dinvestissement.service';

@Component({
    selector: 'app-create-investment-type',
    imports: [
        MatIcon,
        FormsModule,
        MatIconButton,
    ],
    templateUrl: './create-investment-type.component.html',
    standalone: true,
    styleUrl: './create-investment-type.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvestmentTypeComponent {
    readonly close = output<void>();
    readonly save = output<void>();
    typesDinvestissementService=inject(TypesDinvestissementService);


    fields = signal<
        {
            name: string;
            label: string;
            type: string;
            required: boolean;
        }[]
    >([]);

    derivedFieldFormulas = signal<
        {
            name: string;
            formula: string;
        }[]
    >([]);




    addField(name: string, label: string, type: string, required: boolean) {
        if (!name.trim()) return;

        this.fields.update(current => [
            ...current,
            { name, label, type, required },
        ]);
    }

    removeField(name: string) {
        this.fields.update(current => current.filter(f => f.name !== name));
    }

    onSubmit(typeId: string, typeName: string, typeDescription: string) {
        const formData = {
            id: typeId,
            name: typeName,
            fields: this.transformFields(this.fields()),
            processorClassName: typeDescription,
            derivedFieldFormulas: this.transformFormulas(this.derivedFieldFormulas())
        };


        console.log(formData);

        this.typesDinvestissementService.addInvestmentType(formData).subscribe({
            next: (response) => {
                console.log('Investment Type added successfully', response);
                this.save.emit(response);
            },
            error: (error) => {
                console.error('Error adding investment type', error);
            }
        });

        // Emit save event

    }


    addDerivedFormula(name: string, formula: string) {
        if (!name.trim() || !formula.trim()) return;

        this.derivedFieldFormulas.update(current => [
            ...current,
            { name, formula },
        ]);
    }

    removeDerivedFormula(name: string) {
        this.derivedFieldFormulas.update(current => current.filter(f => f.name !== name));
    }
    transformFields(fields: {name: string, label: string, type: string, required: boolean}[]) {
        return fields.reduce((acc, field) => {
            acc[field.name] = {
                label: field.label,
                type: field.type,
                required: field.required
            };
            return acc;
        }, {});
    }


    transformFormulas(formulas: {name: string, formula: string}[]) {
        return formulas.reduce((acc, formula) => {
            acc[formula.name] = formula.formula;
            return acc;
        }, {});
    }
}
