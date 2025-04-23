import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Payment } from '../model/payment';
import { LoadingService } from '../../../../../common/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private _data: BehaviorSubject<any> = new BehaviorSubject<Payment[]>([]);


    constructor(private _httpClient: HttpClient,private loading: LoadingService )
    {
    }
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }
    getData(): Observable<any>
    {
        return this._httpClient.get(`${environment.apiUrl}payments/get-all-payments`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    savePayment(newPayment: Payment): Observable<Payment> {
        const payments = this._data.getValue() ?? [];

        const save$ = this._httpClient.post<Payment>(`${environment.apiUrl}payments/add-payment`, newPayment).pipe(
            tap((saved:any) => {
                const newPaymentCalendar = saved.payments[0]; // Assuming the first PaymentCalendar is the one you want


                const updatedPayments = [
                    ...payments.filter(existingPayment =>
                        !newPaymentCalendar.payments.some(newPayment => newPayment.id === existingPayment.id)
                    ),
                    ...newPaymentCalendar.payments
                ];

                // const updatedPayments = [...payments, ...saved.payments];
                console.log("-------------------",updatedPayments);
                this._data.next(updatedPayments);
            }),
            catchError(err => {
                const message = 'Could not save payment';
                console.error(message, err);
               // this.messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        );

        return this.loading.showLoaderUntilCompleted(save$);
    }
    getPaymentsByDate(date: string): Observable<Payment[]> {
        return this._httpClient.get<Payment[]>(`${environment.apiUrl}payments/${date}`).pipe(
            tap((payments) => {
                this._data.next(payments);
            }),
            catchError(err => {
                const message = 'Could not fetch payments by date';
                console.error(message, err);
                return throwError(() => err);
            }),
            shareReplay()
        );
    }

    updatePayment(payment: Payment) {
        return undefined;
    }
    postponePayment(paymentId: string, newDate: Date): Observable<any> {
        const params = new HttpParams().set('newDate', newDate.toISOString().split('T')[0]);

        return this._httpClient.put<any>(
            `${environment.apiUrl}payments/postpone-payment/${paymentId}`,
            {},
            { params }
        );
    }
    cancelPayment(paymentId: string): Observable<any> {
        return this._httpClient.patch(`${environment.apiUrl}payments/cancel/${paymentId}`, {});
    }
}
