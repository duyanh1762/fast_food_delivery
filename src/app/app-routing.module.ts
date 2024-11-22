import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { LandingComponent } from './landing/landing.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AccountHistoryComponent } from './account/account-history/account-history.component';
import { LoginAuthGuard } from './guards/login-auth/login-auth.guard';
import { LoginAuth2Guard } from './guards/login-auth2/login-auth2.guard';

const routes: Routes = [
  {path:"",component:LandingComponent},
  {path:"login",component:LoginComponent,canActivate:[LoginAuth2Guard]},
  {path:"order",component:OrderComponent},
  {path:"cart",component:CartComponent},
  {path:"account",component:AccountComponent,children:[
    {path:"" , redirectTo:"edit",pathMatch:"full"},
    {path:"edit",component:AccountEditComponent},
    {path:"history",component:AccountHistoryComponent},
  ],canActivate:[LoginAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
