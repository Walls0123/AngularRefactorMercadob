import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalsService } from '../services/locals.service';
import { Observable, empty} from 'rxjs';
import {catchError}from 'rxjs/operators'

@Injectable()
export class LocalResolver implements Resolve<any> {
  constructor(private localsservice:LocalsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any>|Promise<any>|any{
    // return this.localsservice.getLocals(route.paramMap.get('id')).pipe(
    //   catchError((err=>{
    //     return empty()
    //   }))
    // )
    return this.localsservice.getLocalsAllJson().pipe(
      catchError((err=>{
        return empty()
      }))
    )
  }
}
