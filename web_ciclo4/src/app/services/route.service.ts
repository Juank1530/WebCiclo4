import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RouteModel } from '../models/route.model';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    this.token = this.securityService.getToken();
   }

   url = "http://localhost:3000"
   token: string = ''

   store(route: RouteModel): Observable<RouteModel> {
    return this.http.post<RouteModel>(`${this.url}/routes`, {
      start_date: route.origin,
      start_time: route.destiny,
      end_date: route.estimated_time
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    }
    );
  }

  getAll(): Observable<RouteModel[]>{
    return this.http.get<RouteModel[]>(`${this.url}/routes`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  countAll(): Observable<RouteModel[]>{
    return this.http.get<RouteModel[]>(`${this.url}/routes/count`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(route: RouteModel): Observable<RouteModel> {
    return this.http.patch<RouteModel>(`${this.url}/routes/${route.id}`, {
      start_date: route.origin,
      start_time: route.destiny,
      end_date: route.estimated_time
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<RouteModel[]>{
    return this.http.delete<RouteModel[]>(`${this.url}/routes/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<RouteModel>{
    return this.http.get<RouteModel>(`${this.url}/routes/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
  
}
