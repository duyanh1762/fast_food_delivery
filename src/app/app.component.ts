import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './Services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("navigation",{read:ElementRef,static:true}) nav:ElementRef;

  title = 'fast_food_order';

  constructor(private router: Router,public api:ApiService){}

  openNav(){
    this.nav.nativeElement.style.display = "block";
  }
  closeNav(){
    this.nav.nativeElement.style.display = "none";
  }

  openCart(){
    this.router.navigate(["/cart"]);
  }
  login(){
    this.router.navigate(["/login"]);
  }
}
