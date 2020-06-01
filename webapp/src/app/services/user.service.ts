import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { User } from '../models/User';
import { UserUpdate } from '../models/UserUpdate';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.api_url + "/users/createUser", user, { withCredentials: true, headers: httpOptions.headers });
  }

  updateUser(userUpdate: UserUpdate): Observable<UserUpdate> {
    return this.http.put<UserUpdate>(this.api_url + "/users/updateUser", userUpdate, { withCredentials: true, headers: httpOptions.headers });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api_url + "/users", { withCredentials: true, headers: httpOptions.headers });
  }

  getUserDetails(number: string): Observable<User[]> {
    return this.http.get<User[]>(this.api_url + "/users/userEntries/" + number, { withCredentials: true, headers: httpOptions.headers });
  }

  disableAccess(plate: string): Observable<any> {
    return this.http.put<any>(this.api_url + "/users/disableAccess/" + plate, null, { withCredentials: true, headers: httpOptions.headers });
  }

  enableAccess(plate: string): Observable<any> {
    return this.http.put<any>(this.api_url + "/users/enableAccess/" + plate, null, { withCredentials: true, headers: httpOptions.headers });
  }

  searchByPlate(plate: string): Observable<any> {
    return this.http.get<any>(this.api_url + "/users/searchByPlate/" + plate, { withCredentials: true, headers: httpOptions.headers });
  }
}