import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  typeSelected:string = "edit";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("login-delivery");
    localStorage.removeItem("user-infor");
    this.router.navigate(["/login"]);
  }
  changeTypeSelected(type:string){
    this.typeSelected = type;
  }
}
