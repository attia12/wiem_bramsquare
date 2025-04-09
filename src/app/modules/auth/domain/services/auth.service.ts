import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

    refreshAccessToken(refreshToken: string): Observable<any> {
        return this._http.post(`${environment.apiAuthUrl}auth/refresh`, { refreshToken });
    }

    logout(refreshToken: string): Observable<any> {
        return this._http.post(`${environment.apiAuthUrl}auth/logout`, { refreshToken });
    }
}
