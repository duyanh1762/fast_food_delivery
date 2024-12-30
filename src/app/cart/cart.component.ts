import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { CartItem } from '../Interface/cart_item';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild("discountInput") discountInput:ElementRef;

  items:Array<CartItem> = [];
  itemMoney:number = 0;
  discount:number = 0;
  deliveryMoney:number = 50000;
  discounts:Array<any> = [];

  constructor(public api:ApiService,private bs:BsModalService) {
    this.api.cartShow = false;
    this.discounts = [
      {id:1,code:"DUYANHDEPTRAI1706",number:10,price:10000},
      {id:2,code:"BEXUANMAILONTON",number:5,price:20000},
    ];
   }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.items = JSON.parse(localStorage.getItem("cart-infor") || "[]");
    this.getItemMoney();
  }

  getItemMoney(){
    this.itemMoney = 0;
    this.items.forEach((i:CartItem)=>{
      this.itemMoney = this.itemMoney + (i.price * i.num);
    });
  }

  addDiscount(){
    let code:string = this.discountInput.nativeElement.value;
    let checked:boolean = false;
    this.discounts.forEach((d:any)=>{
      if(d.code === code){
        checked = true;
        this.discount = d.price;
        d.number = d.number - 1;
        //update number of discount in BE
      }
    });
    if(checked === false){
      alert("Mã khuyến mại không hợp lệ , vui lòng thử lại !");
    }
  }

  changeQuantity(item:CartItem,type:string){
    this.items.forEach((i:CartItem)=>{
      if(i.itemID === item.itemID){
        if(type === "plus"){
          i.num = i.num + 1;
          console.log(i)
        }else if(type === "minus"){
          if(i.num === 1){
            let index:number = this.items.indexOf(i);
            this.items.splice(index,1);
            console.log(i);
          }else{
            i.num = i.num - 1;
          }
        }else if(type === "delete"){
          let index:number = this.items.indexOf(i);
          this.items.splice(index,1);
        }
      }
    });
    this.getItemMoney();
    this.api.cart = this.items;
    localStorage.setItem("cart-infor",JSON.stringify(this.items));
  }

  addNote(item:CartItem){
    this.bs.show(NoteComponent);
  }
}
