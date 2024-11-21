import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type:string = "login";

  constructor(private api:ApiService) {
    this.api.cartShow = false;
  }

  ngOnInit(): void {
  }

  changeType(){
    if(this.type === "login"){
      this.type = "sign_up";
    }else{
      this.type = "login";
    }
  }
}
