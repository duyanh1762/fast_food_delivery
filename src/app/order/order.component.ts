import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  groups:Array<any> = [];
  items:Array<any> = [];

  constructor(private api:ApiService) {
    this.api.cartShow = true
  }

  ngOnInit(): void {
    this.load();
  }
  async load(){
    let request:any = {
      mode:"get",
      data:"",
    };
    await this.api.group(request).toPromise().then((res:any)=>{
      this.groups = res;
    });
    await this.api.item(request).toPromise().then((res:any)=>{
      this.items = res;
    })
  }
}
