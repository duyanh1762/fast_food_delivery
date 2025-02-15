import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailHistoryComponent } from './detail-history/detail-history.component';
import { ApiService } from 'src/app/Services/api.service';
import { DataRequest } from 'src/app/Interface/DataRequest';
import { User } from 'src/app/Models/user';
import { Bill } from 'src/app/Models/bill';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {
  user:User;
  ordersLU:Array<Bill> = [];
  orders:Array<Bill> = [];

  constructor(private bsModal:BsModalService,public api:ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  openDetail(idB:number){
    this.bsModal.show(DetailHistoryComponent,{
      initialState:{
        data:idB,
      }
    });
  }

  load(){
    this.user = JSON.parse(localStorage.getItem("user-infor") || "{}");
    let request:DataRequest = {
      mode:"get-uid",
      data:this.user.id
    };
    this.api.order(request).subscribe((res:any)=>{
      this.orders = [...res];
      this.ordersLU = [...res];
    });
    this.api.getUpdateFromServe((data:Bill)=>{
      this.ordersLU.forEach((b:Bill)=>{
        if(data.id === b.id){
          b.status = data.status;
        }
      });
      this.orders.forEach((b:Bill)=>{
        if(data.id === b.id){
          b.status = data.status;
        }
      });
    });
  }
  getFilterOrder(e:Event){
    this.orders = [];
    let select= e.target as HTMLSelectElement;
    if(select.value === "all"){
      this.orders = this.ordersLU;
    }else{
      this.orders = this.ordersLU.filter((b:Bill)=>{
        return b.status === select.value;
      });
    }
  }
}
