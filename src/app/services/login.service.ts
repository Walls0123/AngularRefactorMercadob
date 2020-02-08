import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="http://amdigital.tech/api/reservas/loginModificarReserva"
  constructor(private http:HttpClient) { }
  loginReserva(log:LoginReserva){
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    //
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post(this.url,JSON.stringify(log),requestOptions)
  }
  setLoginTemporal(token:string){
    console.log(token)
  }
}
export interface LoginReserva{
  login_correo:string;
  login_codigo:string
}
export interface LoginReserva{
  login_correo:string;
  login_codigo:string
}
