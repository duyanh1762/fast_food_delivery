import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { parseHostBindings } from '@angular/compiler';
import { User } from '../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneName:string = "";
  password:string = "";
  rePassword:string = "";
  type:string = "login";
  checkPass:boolean = true;
  checkPhone:boolean = true;

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
    this.checkPass = true;
    this.checkPhone = true;
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
      if(this.phoneName.length < 0 || this.password.length <= 0 || this.rePassword.length <=0){
        alert("Nhập đầy đủ thông tin trong ô trống !");
        this.checkPass = false;
        this.checkPhone = false;
      }else if(this.password.length < 8){
        alert("Mật khẩu phải nhiều hơn 8 ký tự và không bao gồm khoảng trống !")
        this.checkPass = false;
      }else if(this.password != this.rePassword){
        alert("Xác nhận mật khẩu không hợp lệ !");
        this.checkPass = false;
      }else{
        let hashPhone = this.phoneName.split("");
        let checked:boolean = true;
        for(let i = 0; i < hashPhone.length; i++){
          if( i === 0 && Number(hashPhone[i]) > 0){
            alert("Số điện thoại không hợp lệ (Số đầu tiên khác 0) !");
            checked = false;
            this.checkPhone = false;
          }else{
            if(Number(hashPhone[i]) >=0 && Number(hashPhone[i]) <= 9){
              continue;
            }else{
              checked = false;
              this.checkPhone = false;
              break;
            }
          }
        }
        if(checked === false || this.phoneName.length < 10){
          alert("Số điện thoại không hợp lệ, vui lòng nhập đúng định dạng");
        }else{
          let newUser:User = {
            id:0,
            firstName:"",
            lastName:"",
            phone: this.phoneName,
            email: "",
            sex: "",
            birth:"01-01-1960",
            status:"",
            address:"",
            password:this.password,
          };
          let request:any = {
            mode:"create",
            data: newUser
          };
          this.api.user(request).subscribe((res:any)=>{
            if(res.id != 0 && res.id != undefined && res.id != null){
              alert("Đăng ký thành công , vui lòng đăng nhập lại bằng tài khoản này !");
              this.type = "login";
            }else{
              alert("Đã có lỗi xảy ra , vui lòng liên hệ với chúng tôi qua các cổng thông tin như Facebook , Zalo ,... !")
            }
          });
        }
      }
    }
  }
}
