import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailHistoryComponent } from './detail-history/detail-history.component';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {

  constructor(private bsModal:BsModalService) { }

  ngOnInit(): void {
  }
  openDetail(){
    this.bsModal.show(DetailHistoryComponent);
  }
}
