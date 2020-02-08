import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservaEntity } from '../components/localdetails/localdetails.component';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) { }
  url: string = "http://localhost:3001/ping/"
  url2: string = "http://amdigital.tech/api/reservas/"
  url3: string = "http://amdigital.tech/api/reservas/insertarReserva"
  sendReserva(reserva: ReservaEntity): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    return this.http.post(this.url3, JSON.stringify(reserva),options)
  }
  getReserva(id: string): Observable<any> {
    return this.http.get(this.url2 + id)
  }
}
