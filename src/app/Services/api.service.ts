import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillDetail } from '../Models/bill_detail';
import { CartItem } from '../Interface/cart_item';
import { DataRequest } from '../Interface/DataRequest';

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
  group(request:DataRequest){
    return this.http.post(this.server + "/group/fast-food",request);
  }
  item(request:DataRequest){
    return this.http.post(this.server + "/item/fast-food",request);
  }
  user(request:DataRequest){
    return this.http.post(this.server+"/user",request);
  }
  order(request:DataRequest){
    return this.http.post(this.server + '/bill-order',request);
  }
  orderDetail(request:DataRequest){
    return this.http.post(this.server + "/bill-order-detail" , request);
  }

  getCurrentDateTime(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  dateTransform(dateTime: string) {
    const date = new Date(dateTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
  }

  getStatus(type:string):string{ //not_confirm -> confirm -> delivering -> pay
    if(type === "pay"){
      return "Đã thanh toán";
    } else if(type === "confirm"){
      return "Đã xác nhận";
    } else if(type === "not_confirm"){
      return "Chờ xác nhận";
    } else if(type === "delivering"){
      return "Đang giao";
    }
    return "";
  }
}
