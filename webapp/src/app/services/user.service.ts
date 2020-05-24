import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addUserUrl: string = "http://localhost:3000/users/createUser";
  getUsersUrl: string = "http://localhost:3000/users";
  getUserDetailsUrl: string = "http://localhost:3000/users/userEntries/";
  disablePlateAccessUrl: string = "http://localhost:3000/users/disableAccess/";
  enablePlateAccessUrl: string = "http://localhost:3000/users/enableAccess/";

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.addUserUrl, user, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  getUserDetails(number: string): Observable<User[]> {
    return this.http.get<User[]>(this.getUserDetailsUrl + number);
  }

  disableAccess(plate: string): Observable<any> {
    return this.http.put<any>(this.disablePlateAccessUrl + plate, null);
  }

  enableAccess(plate: string): Observable<any> {
    return this.http.put<any>(this.enablePlateAccessUrl + plate, null);
  }
}