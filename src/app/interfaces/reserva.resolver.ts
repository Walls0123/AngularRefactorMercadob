import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalsService } from '../services/locals.service';
import { Observable, empty} from 'rxjs';
import {catchError}from 'rxjs/operators'
import { ReservaService } from '../services/reserva.service';

@Injectable()
export class ReservaResolve implements Resolve<any> {
  constructor(private reservaService:ReservaService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any>|Promise<any>|any{
    // return this.localsservice.getLocals(route.paramMap.get('id')).pipe(
    //   catchError((err=>{
    //     return empty()
    //   }))
    // )
    return this.reservaService.getReserva(route.paramMap.get('id')).pipe(
      catchError((err=>{
        return empty()
      }))
    )
  }
}
