import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartItem } from 'src/app/Interface/cart_item';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() item:CartItem;
  @Output() eventOut = new EventEmitter();

  note:string = "";

  constructor(private bsRef:BsModalRef) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.note = this.item.des;
  }

  onSubmit(){
    this.eventOut.emit(this.note);
    this.bsRef.hide();
  }
}
