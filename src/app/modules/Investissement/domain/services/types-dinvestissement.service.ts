import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { InvestmentType } from '../models/investment-type';

@Injectable({
  providedIn: 'root'
})
export class TypesDinvestissementService {

    private _data: BehaviorSubject<any> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient)
    {
    }
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }
    getData(): Observable<any>
    {
        return this._httpClient.get(`${environment.apiUrl}investment-types/list-investment-types`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
                shareReplay();
            }),
        );
    }
    addInvestmentType(investmentType: InvestmentType): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}investment-types/add-investment-type`, investmentType).pipe(
            tap((response: any) => {
                console.log('Investment Type added successfully', response);
                const updatedData = [...this._data.getValue(), response];
                 this._data.next(updatedData);
            })
        );
    }

}
