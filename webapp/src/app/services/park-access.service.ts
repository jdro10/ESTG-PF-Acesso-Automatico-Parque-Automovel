import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParkAccess } from '../models/ParkAccess';
import { ParkMode } from '../models/ParkMode';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ParkAccessService {

  parkAccessUrl: string = "http://localhost:3000/users/showParkAccessByDate/";
  openParkAccessUrl: string = "http://localhost:3000/users/showOpenParkAccessByDate/"
  getParkModeUrl: string = "http://localhost:3000/park/getParkMode";
  changeParkModeUrl: string = "http://localhost:3000/park/setParkMode";

  constructor(private http: HttpClient) {}
  
  getParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.parkAccessUrl + date);
  }

  getOpenParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.openParkAccessUrl + date);
  }

  getParkMode(): Observable<any> {
    return this.http.get<any>(this.getParkModeUrl);
  }

  changeParkMode(parkM: string): Observable<ParkMode> {
    return this.http.put<ParkMode>(this.changeParkModeUrl, parkM, httpOptions);
  }
}