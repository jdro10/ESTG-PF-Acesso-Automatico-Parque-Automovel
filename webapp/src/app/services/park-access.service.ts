import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParkAccess } from '../models/ParkAccess';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkAccessService {

  parkAccessUrl: string = "http://localhost:3000/users/showParkAccessByDate/";

  constructor(private http: HttpClient) {}
  
  getParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.parkAccessUrl + date);
  }
}