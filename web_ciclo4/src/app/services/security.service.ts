import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url = "http://localhost:3000";
  sessionUserData = new BehaviorSubject<UserModel>(new UserModel());

  constructor(private http: HttpClient) {
    this.verifySession();
  }

  login(email: string, password: string): Observable<any> {
    //We do the request to login web service, send it user and password
    return this.http.post<any>(`${this.url}/login`, {
      user: email,
      password: password
    }, {
      headers: new HttpHeaders({
      })
    });
  }

  StoreSession(data: any): Boolean {
    // We verify if there is a session stared
    let sessionData = localStorage.getItem("sessionData");
    if (sessionData) {
      return false;
    } else {
      // We define the data to store
      let payload = {
        id: data?.data.id,
        username: data?.data.name + " " + data?.data.last_name ,
        token: data.token,
        isLoggedIn: true
      };
      // We parse it to string
      let dataString = JSON.stringify(payload);
      // We store the data in the localStorage
      localStorage.setItem("sessionData", dataString);
      // We define a session flag
      data.isLoggedIn = true;
      // We refresh data session
      this.refreshDataSession(data);
      return true;
    }
  }

refreshDataSession(data: any){
    this.sessionUserData.next(data)
  }

deleteSession(){
    //We delete data session
    localStorage.removeItem("sessionData")
    this.refreshDataSession(new UserModel)
  }

verifySession(){
    let data = this.isLoggedIn();
    if(data){
      this.refreshDataSession(data)
    }
  }

  isLoggedIn(){
    //We verify is there is information in localStorage
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      //If there is information it return it
      let data = JSON.parse(sessionData);
      return data;
    }
    return null
  }

  userDataSession(){
    return this.sessionUserData.asObservable();
  }


  getToken(){
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      let data = JSON.parse(sessionData);
      return data.token;
    }
    return ''
  }






}
