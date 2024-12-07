import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { LandingComponent } from './landing/landing.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AccountHistoryComponent } from './account/account-history/account-history.component';
import { DetailHistoryComponent } from './account/account-history/detail-history/detail-history.component';
import { GroupNamePipe } from './pipe/group-name/group-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    LandingComponent,
    CartComponent,
    LoginComponent,
    AccountComponent,
    AccountEditComponent,
    AccountHistoryComponent,
    DetailHistoryComponent,
    GroupNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
