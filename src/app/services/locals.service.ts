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
  private urlrodseacrh:string="http://amdigital.tech/api/"
  private urlbuscar:string="http://amdigital.tech/api/ruta?ubicacion="
  private urlbuscarmientrasnavega="http://amdigital.tech/api/locales/busquedaPosicion/"
  private urlbuscarposicion="http://192.168.1.7/z_proyectosLaravel/MercadoBodegasDos/public/api/locales/busquedaPosicion/"
  getData():boolean{

    return true;
  }
  getLocals(id:string):Observable<any>{
    return this.http.get(this.localsurl);
  }
  getLocalsByRealtime(lat:number,lng:number,rg:number,r2:number):Observable<any>{
    return this.http.get(this.urlbuscarposicion+lat+'/'+lng+'/'+rg+'/'+r2)
  }
  getLoclsJson():Observable<any>{
    return this.http.get(this.localsurl);
  }
  //**TODO:Integration Api/Rod */
  getLocalsAllJson(id:string):Observable<any>{
    return this.http.get(this.urlbuscar+id)
  }
  getLocalsUnitJson(id:string):Observable<any>{
    return this.http.get(this.urlrod+'locales/'+id)
  }
}

