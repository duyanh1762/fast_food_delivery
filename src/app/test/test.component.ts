import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

interface ItemEdit{
  id:number;
  policyID:number[];
  name:string
  price:number;
  groupID:number;
  isChosen:boolean;
  isEdit:boolean;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  items:Array<ItemEdit> = [];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.items({mode:"get",data:""}).subscribe((res:any)=>{
      res.forEach((i:any)=>{
        this.items.push({...i, isChosen:false,isEdit:false});
      });
      this.items.forEach((i:ItemEdit)=>{
        i.policyID.forEach((pID:number)=>{
          if(pID === 1){
            i.isChosen = true;
          }
        });
      });
    });
  }

  updateStatus(i:ItemEdit){
    i.isEdit = true;
    if(i.isChosen === true){
      let index:number = i.policyID.indexOf(1);
      i.policyID.splice(index,1);
      i.isChosen = false;
    }else{
      i.policyID.push(1);
      i.isChosen = true
    }
  }

  confirm(){
    this.items.forEach((i:ItemEdit)=>{
      if(i.isEdit === true){
        let uI:any = {
          id:i.id,
          policyID:i.policyID,
          name:i.name,
          price:i.price,
          groupID:i.groupID,
        };
        // this.api.items({mode:"update",data:uI}).subscribe((res:any)=>{
        //   console.log(res);
        // });
        console.log(uI);
      }
    });
  }

}
