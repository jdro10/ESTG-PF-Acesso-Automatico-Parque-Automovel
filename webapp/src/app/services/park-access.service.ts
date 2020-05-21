import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParkAccess } from '../models/ParkAccess';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkAccessService {
  //private sharedData = new BehaviorSubject('2020-05-16')
  //currentData = this.sharedData.asObservable();
  parkAccessUrl: string = "http://localhost:3000/users/showParkAccessByDate/";

  constructor(private http: HttpClient) {}

  //changeData(data: string){
  //  this.sharedData.next(data);
  //}

  getParkAccess(date: string): Observable<ParkAccess[]> {
    return this.http.get<ParkAccess[]>(this.parkAccessUrl + date);
  }
}