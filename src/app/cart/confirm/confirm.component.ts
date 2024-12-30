import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartItem } from 'src/app/Interface/cart_item';
import { DataRequest } from 'src/app/Interface/DataRequest';
import { Bill } from 'src/app/Models/bill';
import { BillDetail } from 'src/app/Models/bill_detail';
import { User } from 'src/app/Models/user';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() items:Array<CartItem>;

  address:string = "";
  user:User;

  constructor(private bsRef:BsModalRef, private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.user = JSON.parse(localStorage.getItem('user-infor') || "{}");
    this.address = this.user.address;
    console.log(this.items);
  }

  onSubmit(){
    if(this.address != this.user.address){
      if(confirm("Bạn có muốn cập nhật địa chỉ mới ?")){
        this.user.address = this.address;
        this.api.user({mode:"update",data:this.user}).subscribe((res:any)=>{
          if(res.affected === 1){
            alert("Cập nhật địa chỉ thành công !");
          }else{
            alert("Cập nhật thất bại , đã có lỗi xảy ra !");
          }
        });
      }
    }
    let bill:Bill = {
      id:0,
      date:this.api.getCurrentDateTime(),
      userID:this.user.id,
      address:this.address,
      status:"not_confirm",
    };
    let request:DataRequest = {
      mode:"create",
      data:bill
    };
    this.api.order(request).subscribe((res:any)=>{
      if(res.result){
        alert("Đã có lỗi xảy ra , vui lòng thử lại !");
      }else{
        this.items.forEach((ci:CartItem)=>{
          let newDetail:BillDetail = {
            id: 0,
            itemID: ci.itemID,
            num: ci.num,
            des: ci.des,
            billOrderID: res.id,
          };
          this.api.orderDetail({mode:"create",data:newDetail}).subscribe((res:any)=>{
            if(res.result){
              alert("Đã có lỗi xảy ra , vui lòng thử lại !");
            }else{
              this.bsRef.hide();
              this.router.navigate(["/account/history"]);
              this.api.cart = [];
              localStorage.removeItem("cart-infor");
            }
          });
        });
      }
    });
  }
}
