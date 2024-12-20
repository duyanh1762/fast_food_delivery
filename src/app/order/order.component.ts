import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Item } from '../Models/item';
import { Group } from '../Models/group';
import { BillDetail } from '../Models/bill_detail';
import { CartItem } from '../Interface/cart_item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  groups:Array<Group> = [];
  items:Array<Item> = [];
  itemLU:Array<Item> = [];
  type:string = "all";

  constructor(private api:ApiService) {
    this.api.cartShow = true
  }

  ngOnInit(): void {
    this.load();
  }
  async load(){
    let request:any = {
      mode:"get",
      data:"",
    };
    await this.api.group(request).toPromise().then((res:any)=>{
      this.groups = res;
    });
    await this.api.item(request).toPromise().then((res:any)=>{
      this.items = res;
      this.itemLU = res;
    })
  }
  getGroupItems(idG:number,type:string){
    this.items = [];
    this.itemLU.forEach((i:Item)=>{
      if(i.groupID === idG){
        this.items.push(i);
      }
    });
    this.type = type;
  }
  getAll(){
    this.type = "all";
    this.items = this.itemLU;
  }
  addCart(i:Item){
    let cartStorage = JSON.parse(localStorage.getItem("cart-infor")|| "[]");
    if(cartStorage === "[]"){
      localStorage.setItem("cart-infor",JSON.stringify(this.api.cart));
    }
    let checked:boolean = true;
    this.api.cart.forEach((ci:CartItem)=>{
      if(i.id === ci.itemID){
        ci.num = ci.num + 1;
        checked = false;
      }
    });
    if(checked === true){
      let newCI:CartItem = {
        id:0,
        itemID:i.id,
        name:i.name,
        price:i.price,
        num:1,
        billOrderID:0
      };
      this.api.cart.push(newCI);
    }
    localStorage.setItem("cart-infor",JSON.stringify(this.api.cart));
  }
}
