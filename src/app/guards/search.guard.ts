import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalsService } from '../services/locals.service';

@Injectable({
  providedIn: 'root'
})

export class SearchGuard implements CanActivate {
  constructor(private localserice:LocalsService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localserice.getData()){
      console.log('Route Resolve')
      return true;
    }
    else{
      console.log('Redirect')
      this.router.navigate(['/']);
      return false;
    }


  }

}
