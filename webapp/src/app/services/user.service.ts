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

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.addUserUrl, user, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }
}