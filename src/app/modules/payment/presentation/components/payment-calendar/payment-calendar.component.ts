import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-payment-calendar',
    imports: [FullCalendarModule, PaymentFormComponent, DatePipe],
    templateUrl: './payment-calendar.component.html',
    standalone: true,
    styleUrl: './payment-calendar.component.scss',
})
export class PaymentCalendarComponent {
    selectedDate: string = '';
    selectedPayments: any[] = [];
    showForm: boolean = false;
    payments = [
        { id:'1',title: 'Fournisseur Matériel', date: '2025-03-15', amount: '1250,75 €', status: 'En attente' },
        { id:'2',title: 'Abonnement Cloud', date: '2025-03-18', amount: '299,99 €', status: 'En attente' }
    ];
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        editable: false,
        dateClick: this.handleDateClick.bind(this),
        events: this.payments.map(p => ({ title: p.title, start: p.date, color: '#4285F4' }))
    };

    constructor(private cdr: ChangeDetectorRef) {}

    handleDateClick(arg: any) {
        this.selectedDate = arg.dateStr; // Store selected date
        console.log("selected date",this.selectedDate)


        // Filter payments based on clicked date
        this.selectedPayments = this.payments.filter(p => p.date === this.selectedDate);
        console.log("selected date",this.selectedPayments)
        this.cdr.detectChanges();
        if(this.showForm) {
            this.showForm = false;
        }
    }
    openForm() {
        this.showForm = true;
    }

    closeForm() {
        this.showForm = false;
    }


    protected readonly Date = Date;
}
