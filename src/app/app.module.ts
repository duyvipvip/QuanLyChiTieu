import { AddBudgetComponent } from './client/budget/add-budget/add-budget.conponent';
import { ChooseBudgetComponent } from './client/budget/choose-budget/choose-budget.component';
import { BudgetComponent } from './client/budget/budget.component';
import { MyCurrencyPipe } from './pipe/myCurrency.pipe';
import { NumberPipe } from './pipe/number.pipe';
import { ChooseWalletReportComponent } from './client/home/report/update-transaction/choose-wallet/choose-wallet';
import { ChooseCategoryReportComponent } from './client/home/report/update-transaction/choose-category/choose-category';
import { UpdateTransactionComponent } from './client/home/report/update-transaction/update-transaction';
import { WalletTransactionService } from './service/walletTransaction.service';
import { ChooseWalletTransactionComponent } from './client/home/transaction/choose-wallet-transaction/choose-wallet-transaction';
import { ChooseTransactionComponent } from './client/home/transaction/choose-transaction/choose-transaction';
import { EditWalletComponent } from './client/home/wallet/edit-wallet/edit-wallet.component';
import { ChooseWalletComponent } from './client/home/wallet/choose-wallet/choose-wallet.component';
import { WalletComponent } from './client/home/wallet/wallet.component';
import { AddWalletComponent } from './client/home/wallet/add-wallet/add-wallet.component';
import { TransactionComponent } from './client/home/transaction/transaction.component';
import { ITagModel } from './model/tagmodel.model';
import { FomatDateService } from './service/fomatDate.service';
import { Debt_LoanSevice } from './service/debt-loan.service';
import {RouterModule, Routes} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { transition } from '@angular/core/src/animation/dsl';
import { WalletService } from './service/wallet.service';
import { FormsModule } from '@angular/forms';
import { InCome } from './service/income.service';
import { Expense } from './service/expense.service';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CheckValueSevice } from './service/check-value.sevice';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ReportComponent } from './client/home/report/report.component';
// CONFIG ROUTER
const appRoutes: Routes = [
  { path: '', redirectTo: 'wallet', pathMatch: 'full'}, 

  // DƯỜNG DẪN PATH ĐẾN TRANG CHỦ
  { path: 'wallet', component:  ClientHomeComponent},

  // DƯỜNG DẪN PATH ĐẾN TRANG CHỦ CHUYỀN VÀO ID VÍ
  { path: 'wallet/:idwallet', component:  ClientHomeComponent},

  // ĐƯỜNG DẪN PATH ĐẾN TRANG LOGIN
  {path: 'dangnhap', component: ClientLoginComponent},

  // ĐƯỜNG DẪN URL ĐẾN TRANG ĐĂNG KÍ
  {path: 'dangki', component: ClientRegisterComponent},

  // DƯỜNG DẪN URL DẾN TRANG BUDGET
  {path: 'bugget', component: BudgetComponent},

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
    NumberPipe,
    MyCurrencyPipe,

    // PHẦN TEMPLATE
    MenuComponent,
    HeaderComponent,
    FooterComponent,

    // PHẦN WALLET
    WalletComponent,
    AddWalletComponent,
    ChooseWalletComponent,
    EditWalletComponent,

    // PHẦN TRANSACTION
    TransactionComponent,
    ChooseTransactionComponent,
    ChooseWalletTransactionComponent,

    // PHẦN REPORT
    ReportComponent,
    UpdateTransactionComponent,
    ChooseCategoryReportComponent,
    ChooseWalletReportComponent,

    // PHẦN BUDGET
    BudgetComponent,
    ChooseBudgetComponent,
    AddBudgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    ToastModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule ,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  
  providers: [ WalletService, InCome, Expense, Debt_LoanSevice, FomatDateService, CheckValueSevice, WalletTransactionService],
  bootstrap: [AppComponent],
})

export class AppModule { }
