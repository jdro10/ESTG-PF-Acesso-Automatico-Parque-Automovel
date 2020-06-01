import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from './../../environments/environment';
import { ParkAccess } from '../models/ParkAccess';
import { ParkMode } from '../models/ParkMode';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ParkAccessService {
  api_url = environment.api_url;

  constructor(private http: HttpClient) {}
  
  getParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.api_url + "/users/showParkAccessByDate/" + date, { withCredentials: true, headers: httpOptions.headers });
  }

  getOpenParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.api_url + "/users/showOpenParkAccessByDate/" + date, { withCredentials: true, headers: httpOptions.headers });
  }

  getParkMode(): Observable<any> {
    return this.http.get<any>(this.api_url + "/park/getParkMode", { withCredentials: true, headers: httpOptions.headers });
  }

  changeParkMode(parkM: string): Observable<ParkMode> {
    return this.http.put<ParkMode>(this.api_url + "/park/setParkMode", parkM, { withCredentials: true, headers: httpOptions.headers });
  }
}