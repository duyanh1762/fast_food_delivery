import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillDetail } from '../Models/bill_detail';
import { CartItem } from '../Interface/cart_item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartShow:boolean = true;
  cart:Array<CartItem> = [];
  server:string = "http://localhost:3000";

  constructor(private http:HttpClient) {
    this.cart = JSON.parse(localStorage.getItem("cart-infor") || "[]");
  }

  login(request:any){
   return this.http.post(this.server + "/login-authen/fast-food",request);
  }
  group(request:any){
    return this.http.post(this.server + "/group/fast-food",request);
  }
  item(request:any){
    return this.http.post(this.server + "/item/fast-food",request);
  }
  user(request:any){
    return this.http.post(this.server+"/user",request);
  }
}
