import { Component, OnInit } from '@angular/core';
import { DataRequest } from 'src/app/Interface/DataRequest';
import { BillDetail } from 'src/app/Models/bill_detail';
import { Item } from 'src/app/Models/item';
import { ApiService } from 'src/app/Services/api.service';

interface DetailItem {
  id: number;
  itemID: number;
  num: number;
  billOrderID: number;
  name: string;
  total: number;
  price: number;
}

@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.component.html',
  styleUrls: ['./detail-history.component.css'],
})
export class DetailHistoryComponent implements OnInit {
  data: number;
  items: Array<Item> = [];
  details: Array<DetailItem> = [];
  total:number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
    console.log(this.items);
  }

  load() {
    let request: DataRequest = {
      mode: 'get',
      data: '',
    };
    this.api.item(request).subscribe((res: any) => {
      this.items = res;
    });
    this.api.orderDetail({ mode: 'get', data: this.data }).subscribe((res: any) => {
        res.forEach((d: BillDetail) => {
          this.items.forEach((i: Item) => {
            if (d.itemID === i.id) {
              let totalItem: number = i.price * d.num;
              this.details.push({
                ...d,
                total: totalItem,
                name: i.name,
                price: i.price,
              });
              this.total = this.total + totalItem;
            }
          });
        });
      });
  }
}
