import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  user:User;
  constructor() { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.user = JSON.parse(localStorage.getItem("user-infor") || "{}");
    console.log(this.user)
  }
}
