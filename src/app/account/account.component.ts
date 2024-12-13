import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  typeSelected:string = "edit";

  constructor(private router:Router , private api:ApiService) { }

  ngOnInit(): void {
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
}
