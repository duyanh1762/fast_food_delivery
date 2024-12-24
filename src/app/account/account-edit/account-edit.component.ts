import { Component, OnInit } from '@angular/core';
import { DataRequest } from 'src/app/Interface/DataRequest';
import { User } from 'src/app/Models/user';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  constructor(private api:ApiService) { }
  checked:boolean = true;
  user:User;
  birthDay = {
    day:0,
    month:0,
    year:0,
  };
  days: number[] = [];
  months = [
    { value: 1, name: 'Tháng 1' },
    { value: 2, name: 'Tháng 2' },
    { value: 3, name: 'Tháng 3' },
    { value: 4, name: 'Tháng 4' },
    { value: 5, name: 'Tháng 5' },
    { value: 6, name: 'Tháng 6' },
    { value: 7, name: 'Tháng 7' },
    { value: 8, name: 'Tháng 8' },
    { value: 9, name: 'Tháng 9' },
    { value: 10, name: 'Tháng 10' },
    { value: 11, name: 'Tháng 11' },
    { value: 12, name: 'Tháng 12' }
  ];
  years: number[] = [];

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.user = JSON.parse(localStorage.getItem("user-infor") || "{}");
    let newDay = new Date();
    for(let i=1960;i<=Number(newDay.getFullYear());i++){
      this.years.push(i);
    };
    this.birthDay.day = Number(this.user.birth.split("-")[0]);
    this.birthDay.month = Number(this.user.birth.split("-")[1]);
    this.birthDay.year = Number(this.user.birth.split("-")[2]);
    this.updateDays();
  }

  updateDays() {
    const month = Number(this.birthDay.month) || 1;
    const year = Number(this.birthDay.year) || Number(new Date().getFullYear());

    const daysInMonth = new Date(year, month, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  onSubmit(){
    let day:string = "";
    let month:string = "";
    let hashPhone = this.user.phone.split("");
    this.checked = true
    if(hashPhone.length < 10){
      alert("Số điện thoại không đúng định dạng (ít nhất 10 số) !");
      this.checked = false;
    }else{
      for(let i = 0;i<hashPhone.length;i++){
        if( i === 0 && Number(hashPhone[i]) > 0){
          alert("Số điện thoại không đúng định dạng (Số đầu tiên khác 0) !");
          this.checked = false;
          break;
        }else{
          if(Number(hashPhone[i]) >=0 && Number(hashPhone[i]) <= 9){
            continue;
          }else{
            this.checked = false;
            alert("Số điện thoại không đúng định dạng (Xuất hiện ký tự không phải sô) !");
            break;
          };
        };
      }
      if(this.checked === true){
        if(this.birthDay.day < 10){
          day = `0${this.birthDay.day}`;
        }else{
          day = this.birthDay.day.toString();
        };
        if(this.birthDay.month < 10){
          month = `0${this.birthDay.month}`;
        }else{
          month = this.birthDay.month.toString();
        };
        this.user.birth = `${day}-${month}-${this.birthDay.year}`;
        let request:DataRequest = {
          mode:"update",
          data:this.user
        };
        this.api.user(request).subscribe((res:any)=>{
          if(res.affected === 1){
            alert("Cập nhật thành công");
            localStorage.setItem("user-infor",JSON.stringify(this.user));
          }else{
            alert("Cập nhật thất bại, đã có lỗi xảy ra !");
          }
        });
      }
    }
  }
}
