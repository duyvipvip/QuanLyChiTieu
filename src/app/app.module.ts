import {RouterModule, Routes} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransactionComponent } from './client/template/transaction/transaction.component';
import { AddWalletComponent } from './client/template/wallet/add-wallet/add-wallet.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ClientHomeComponent} from "./client/home/clienthome.component";
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { ClientRegisterComponent } from './client/register/clientregister.component';
import { MenuComponent } from './client/template/menu/menu.component';
import { HeaderComponent } from './client/template/header/header.component';
import { FooterComponent } from './client/template/footer/footer.component';
import { templateJitUrl } from '@angular/compiler';
import { ChangeTransaction } from './client/template/change-transaction/change-transaction';
import { WalletComponent } from './client/template/wallet/wallet.component';
import { ChooseWalletComponent } from './client/template/wallet/choose-wallet/choose-wallet.component';
import { transition } from '@angular/core/src/animation/dsl';
import { Wallet } from './service/wallet.service';
import { EditWalletComponent } from './client/template/wallet/edit-wallet/edit-wallet.component';
import { FormsModule } from '@angular/forms';
import { ChooseTransactionComponent } from './client/template/transaction/choose-transaction/choose-transaction';

// CONFIG ROUTER
const appRoutes: Routes = [
  // DƯỜNG DẪN PATH ĐẾN TRANG CHỦ
  { path: '', component:  ClientHomeComponent},
  // ĐƯỜNG DẪN PATH ĐẾN TRANG LOGIN
  {path: 'dangnhap', component: ClientLoginComponent},
  // ĐƯỜNG DẪN URL ĐẾN TRANG ĐĂNG KÍ
  {path: 'dangki', component: ClientRegisterComponent},
  // ĐƯỜNG DẪN ĐẾN TRANG 404
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientHomeComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    PageNotFoundComponent,
    AdminComponent,

    // PHẦN TEMPLATE
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ChangeTransaction,

    // PHẦN WALLET
    WalletComponent,
    AddWalletComponent,
    ChooseWalletComponent,
    EditWalletComponent,

    // PHẦN TRANSACTION
    TransactionComponent,
    ChooseTransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [Wallet],
  bootstrap: [AppComponent]
})

export class AppModule { }
