import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuth2Guard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loginInfor: any = localStorage.getItem('login-delivery');
      if(loginInfor === false || loginInfor === null || loginInfor === undefined || loginInfor === ""){
        return true;
      }
      this.router.navigate(["/account"]);
      return false;
  }

}
