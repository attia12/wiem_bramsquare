import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

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
        return this._httpClient.get(`${environment.apiUrl}rapports`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
}
