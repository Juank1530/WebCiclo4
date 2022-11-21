import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirportModel } from '../models/airport.model';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    this.token = this.securityService.getToken();
   }

   url = "http://localhost:3000"
   token: string = ''

   store(airport: AirportModel): Observable<AirportModel> {
    return this.http.post<AirportModel>(`${this.url}/airports`, {
      name: airport.name,
      city: airport.city,
      country: airport.country,
      coor_x: airport.coor_x,
      coor_y: airport.coor_y,
      acronym: airport.acronym,
      type: airport.type
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    }
    );
  }

  getAll(): Observable<AirportModel[]>{
    return this.http.get<AirportModel[]>(`${this.url}/airports`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  countAll(): Observable<AirportModel[]>{
    return this.http.get<AirportModel[]>(`${this.url}/airports/count`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(airport: AirportModel): Observable<AirportModel> {
    return this.http.patch<AirportModel>(`${this.url}/airports/${airport.id}`, {
      name: airport.name,
      city: airport.city,
      country: airport.country,
      coor_x: airport.coor_x,
      coor_y: airport.coor_y,
      acronym: airport.acronym,
      type: airport.type
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<AirportModel[]>{
    return this.http.delete<AirportModel[]>(`${this.url}/airports/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<AirportModel>{
    return this.http.get<AirportModel>(`${this.url}/airports/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }





}
