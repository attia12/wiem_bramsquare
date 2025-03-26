import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
        return this._httpClient.get(`${environment.apiUrl}payments`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    savePayment(newPayment: Payment): Observable<Payment> {
        const payments = this._data.getValue();

        const save$ = this._httpClient.post<Payment>(`${environment.apiUrl}payments`, newPayment).pipe(
            tap(saved => {
                const updatedPayments = [...payments, saved];
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
}
