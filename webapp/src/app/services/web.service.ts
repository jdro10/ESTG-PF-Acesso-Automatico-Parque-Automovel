import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { UserLogin } from '../models/UserLogin';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class WebService {
  api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<any> {
    return this.http.post<any>(this.api_url + "/auth/login", user, { withCredentials: true, headers: httpOptions.headers });
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.api_url + "/auth/logout", { withCredentials: true, headers: httpOptions.headers });
  }

  currentUser(): Observable<any> {
    return this.http.get<any>(this.api_url + "/webUser/currentUsername", { withCredentials: true, headers: httpOptions.headers });
  }
}