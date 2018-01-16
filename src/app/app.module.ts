import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { ClientHomeComponent} from "./client/home/clienthome.component";
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { Route } from '@angular/compiler/src/core';
import {RouterModule, Routes} from '@angular/router';
import { ClientRegisterComponent } from './client/register/clientregister.component';
import { ChooseWalletTemplate } from './client/template/choose-wallet/choose-wallet.component';
import { AddWalletComponent } from './client/template/add-wallet/add-wallet.component';
import { MenuComponent } from './client/template/menu/menu.component';
import { HeaderComponent } from './client/template/header/header.component';
import { FooterComponent } from './client/template/footer/footer.component';
import { ChooseTransactionComponent } from './client/template/choose-transaction/choose-transaction';
import { templateJitUrl } from '@angular/compiler';
import { ChangeTransaction } from './client/template/change-transaction/change-transaction';

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
    ChooseWalletTemplate,
    AddWalletComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ChooseTransactionComponent,
    ChangeTransaction,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
