import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestissementService {
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
        return this._httpClient.get(`${environment.apiUrl}investments/get-all-investments`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    addInvestment(investmentRequest: any): Observable<any> {
        return this._httpClient
            .post(`${environment.apiUrl}investments/add-investment`, investmentRequest)
            .pipe(
                tap((response: any) => {

                    const currentInvestments = this._data.getValue();
                    console.log("currentInvestments", currentInvestments);

                    // Ensure currentInvestments is defined and contains 'content'
                    const updatedInvestments = currentInvestments?.content
                        ? [...currentInvestments.content, response]  // Add the new investment to content
                        : [response];  // If content is empty or undefined, just use the new response

                    // Update the BehaviorSubject with the updated investments
                    this._data.next({ ...currentInvestments, content: updatedInvestments });
                    console.log("updatedInvestments", updatedInvestments);
                })
            );
    }

    exportCsv(page: number = 0, size: number = 100): void {
        this._httpClient.get(`${environment.apiUrl}dashboard/export/csv?page=${page}&size=${size}`, {
            responseType: 'blob'
        }).subscribe(blob => {
            this.downloadFile(blob, 'investments.csv', 'text/csv');
        });
    }

    exportExcel(page: number = 0, size: number = 100): void {
        this._httpClient.get(`${environment.apiUrl}dashboard/export/excel?page=${page}&size=${size}`, {
            responseType: 'blob'
        }).subscribe(blob => {
            this.downloadFile(blob, 'investments.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        });
    }
    exportPdf(page: number = 0, size: number = 100): void {
        this._httpClient.get(`${environment.apiUrl}dashboard/export/pdf?page=${page}&size=${size}`, {
            responseType: 'blob'
        }).subscribe(blob => {
            this.downloadFile(blob, 'investments.pdf', 'application/pdf');
        });
    }

    private downloadFile(data: Blob, filename: string, type: string): void {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        anchor.click();

        window.URL.revokeObjectURL(url);
    }


}
