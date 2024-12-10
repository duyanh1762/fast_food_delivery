import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneName:string = "";
  password:string = "";
  type:string = "login";

  constructor(private api:ApiService,private router:Router) {
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

  onSubmit(){
    if(this.type === "login"){
      let request = {
        phoneName: this.phoneName,
        password:this.password,
      };
      this.api.login(request).subscribe((res:any)=>{
        if(res.success === true){
          localStorage.setItem("login-delivery",JSON.stringify(true));
          localStorage.setItem("user-infor",JSON.stringify(res.user));
          this.router.navigate(["/account"]);
        }else{
          alert("Sai thông tin đăng nhâp !");
        }
      });
    }else{
      //to do.....
    }
  }
}
