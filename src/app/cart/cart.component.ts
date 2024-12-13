import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { CartItem } from '../Interface/cart_item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items:Array<CartItem> = [];

  constructor(public api:ApiService) {
    this.api.cartShow = false;
   }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.items = JSON.parse(localStorage.getItem("cart-infor") || "[]");
  }
}
