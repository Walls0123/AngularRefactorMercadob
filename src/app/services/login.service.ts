import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModificarReservaEntity } from '../components/reserva/reserva.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="http://amdigital.tech/api/reservas/loginModificarReserva"
  urlmodreserva:string="http://amdigital.tech/api/reservas/modificarReserva"
  urlborrar:string="http://amdigital.tech/api/reservas/borrar/"
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
  modificarReserva(modreserva:ModificarReservaEntity){
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    //
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post(this.urlmodreserva,JSON.stringify(modreserva),requestOptions)
  }
  cancelarserver(id:string){
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    //
    console.log(id)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.get(this.urlborrar+id)
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
