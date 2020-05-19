import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParkAccess } from '../models/ParkAccess';
import { Observable } from 'rxjs';

const HttpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ParkAccessService {
  parkAccessUrl: string = "http://localhost:3000/users/parkAccess";

  constructor(private http: HttpClient) { }

  getParkAccess(): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.parkAccessUrl);
  }
}
