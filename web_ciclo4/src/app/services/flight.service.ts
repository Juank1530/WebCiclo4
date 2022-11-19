import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FlightModel } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    this.token = this.securityService.getToken();
   }


  store(flight: FlightModel): Observable<FlightModel> {
    return this.http.post<FlightModel>(`${this.url}/flights`, {
      start_date: flight.start_date,
      start_time: flight.start_time,
      end_date: flight.end_date,
      end_time: flight.end_time,
      seats_sold: flight.seats_sold,
      pilot_name: flight.pilot_name,
      route: flight.route,
    }
    ,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  getAll(): Observable<FlightModel[]>{
    return this.http.get<FlightModel[]>(`${this.url}/flights`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  countAll(): Observable<FlightModel[]>{
    return this.http.get<FlightModel[]>(`${this.url}/flights/count`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(flight: FlightModel): Observable<FlightModel> {
    return this.http.patch<FlightModel>(`${this.url}/flights/${flight.id}`, {
      start_date: flight.start_date,
      start_time: flight.start_time,
      end_date: flight.end_date,
      end_time: flight.end_time,
      seats_sold: flight.seats_sold,
      pilot_name: flight.pilot_name,
      route: flight.route
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<FlightModel[]>{
    return this.http.delete<FlightModel[]>(`${this.url}/flights/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<FlightModel>{
    return this.http.get<FlightModel>(`${this.url}/flights/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }




}
