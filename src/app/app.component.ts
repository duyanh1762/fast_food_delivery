import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("navigation",{read:ElementRef,static:true}) nav:ElementRef;

  title = 'fast_food_order';

  openNav(){
    this.nav.nativeElement.style.display = "block";
  }
  closeNav(){
    this.nav.nativeElement.style.display = "none";
  }

}
