import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  typeSelected:string = "edit";
  user:User;

  constructor(private router:Router , private api:ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  logout(){
    localStorage.removeItem("login-delivery");
    localStorage.removeItem("user-infor");
    localStorage.removeItem("cart-infor");
    this.api.cart = [];
    this.router.navigate(["/login"]);
  }
  changeTypeSelected(type:string){
    this.typeSelected = type;
  }
  load(){
    this.user = JSON.parse(localStorage.getItem("user-infor") || "{}");
  }
}
