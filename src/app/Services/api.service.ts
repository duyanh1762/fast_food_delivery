import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartShow:boolean = true;
  server:string = "http://localhost:3000";

  constructor(private http:HttpClient) { }

  login(request:any){
   return this.http.post(this.server + "/login-authen/fast-food",request);
  }
}
