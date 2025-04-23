import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { DatePipe } from '@angular/common';
import { Payment, PaymentType } from '../../../domain/model/payment';
import { PaymentService } from '../../../domain/services/payment.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-payment-calendar',
    imports: [FullCalendarModule, PaymentFormComponent, DatePipe, MatIconButton, MatIcon],
    templateUrl: './payment-calendar.component.html',
    standalone: true,
    styleUrl: './payment-calendar.component.scss',
})
export class PaymentCalendarComponent {
    protected readonly Date = Date;
    selectedDate: string = '';
    selectedPayments:  Payment[] = [];
    showForm: boolean = false;
    payments: Payment[] = [];
    formMode: 'add' | 'edit' | null = null;
    selectedPaymentForEdit: Payment | null = null;
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        dateClick: this.handleDateClick.bind(this),
        eventDrop: this.onEventDrop.bind(this),
        events: [],
        dayMaxEventRows: 3,
        moreLinkText: "voir plus",
    };

    constructor(private cdr: ChangeDetectorRef,  private paymentService: PaymentService) {
        this.loadAllPayments();
        this.calendarOptions.eventClick = this.eventClick.bind(this);
    }

    handleDateClick(arg: any) {
        this.selectedDate = arg.dateStr; // Store selected date
        console.log("selected date",this.selectedDate)


        // Filter payments based on clicked date
        this.selectedPayments = this.payments.filter(p => {
            const paymentDate = new Date(p.date).toISOString().split('T')[0];
            return paymentDate === this.selectedDate;
        });
        console.log("selected date",this.selectedPayments)
        this.formMode = null;
        this.selectedPaymentForEdit = null;
        this.cdr.detectChanges();

    }
    openForm() {
        this.formMode = 'add';
        this.selectedPaymentForEdit = null;
    }

    closeForm() {
        this.formMode = null;
        this.selectedPaymentForEdit = null;
    }


    private loadAllPayments() {
        this.paymentService.data$.subscribe((payments: Payment[]) => {
            this.payments = payments;

            // Update calendar events
            this.calendarOptions.events = this.payments.map(p => ({
                id: p.id,
                title: p.beneficiary,
                start: p.date,
                color: this.getColorForType(p.type)
            }));

            this.cdr.detectChanges();
        });

        // Trigger initial load if needed
       // this.paymentService.getData().subscribe();
    }
    eventClick(info: any) {
        const clickedDate = new Date(info.event.start).toISOString().split('T')[0];
        const clickedTitle = (info.event.title || '').trim().toLowerCase();

        const matched = this.payments.find(p => {
            const paymentDate = new Date(p.date).toISOString().split('T')[0];
            const beneficiary = (p.beneficiary || '').trim().toLowerCase();
            return paymentDate === clickedDate && beneficiary === clickedTitle;
        });

        if (matched) {
            this.selectedPaymentForEdit = matched;
            this.formMode = 'edit';
            this.cdr.detectChanges();
            console.log("✅ Paiement trouvé :", matched);
        } else {
            console.warn("❌ Aucun paiement trouvé pour :", clickedDate, clickedTitle);
        }
    }
    getColorForType(type: PaymentType): string {
        switch (type) {
            case PaymentType.BILL: return '#10b981';
            case PaymentType.SALARY: return '#6366f1';
            default: return '#9ca3af';
        }
    }
    onEventDrop(info: any) {
        const newDate = info.event.startStr;
        const paymentId = info.event.id;

        // Confirm with the user
        Swal.fire({
            title: 'Reporter le paiement ?',
            text: `Souhaitez-vous déplacer ce paiement au ${newDate} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF680D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, déplacer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.paymentService.postponePayment(paymentId, new Date(newDate)).subscribe({
                    next: (res) => {
                        Swal.fire('Déplacé !', 'Le paiement a été mis à jour.', 'success');
                    },
                    error: () => {
                        Swal.fire('Erreur', 'Impossible de déplacer le paiement.', 'error');
                        info.revert();
                    }
                });
            } else {
                info.revert(); // Cancel the drag
            }
        });
    }

}
