import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { DeliveryCost } from '../model/delivery-cost.model';

@Injectable({
  providedIn: 'root'
})
export class DeleveryCoutService {

    private _data: BehaviorSubject<DeliveryCost[]> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient)
    {
    }
    get data$(): Observable<DeliveryCost[]>
    {
        return this._data.asObservable();
    }
    getData(): Observable<DeliveryCost[]>
    {
        return this._httpClient.get(`${environment.apiUrl}delivery`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
}
