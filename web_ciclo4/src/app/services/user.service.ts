import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) { 
    this.token = this.securityService.getToken();
  }

  url = "https://apiloopbackmissionticteam5.herokuapp.com/"
  token: string = ''

  store(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/users`, {
      name: user.name,
      Lastnames: user.Lastnames,
      phone: user.phone,
      email: user.email,
      password: ''
    });
  }

  getAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}/users`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  countAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}/users/count`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.url}/users/${user.id}`, {
      name: user.name,
      Lastnames: user.Lastnames,
      phone: user.phone,
      email: user.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<UserModel[]>{
    return this.http.delete<UserModel[]>(`${this.url}/users/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/users/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }








}
