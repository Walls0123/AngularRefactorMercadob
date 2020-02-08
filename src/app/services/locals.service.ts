import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalsService {
  constructor(private http: HttpClient) { }
  private usersEndpoint = "https://jsonplaceholder.typicode.com/users";
  private localsurl="http://localhost:3000/locals/";
  private urlrod:string="http://amdigital.tech/api/"
  getData():boolean{

    return true;
  }
  getLocals(id:string):Observable<any>{
    return this.http.get(this.localsurl);
  }

  getLoclsJson():Observable<any>{
    return this.http.get(this.localsurl);
  }
  //**TODO:Integration Api/Rod */
  getLocalsAllJson():Observable<any>{
    return this.http.get(this.urlrod+'locales')
  }
  getLocalsUnitJson(id:string):Observable<any>{
    return this.http.get(this.urlrod+'locales/'+id)
  }
}

