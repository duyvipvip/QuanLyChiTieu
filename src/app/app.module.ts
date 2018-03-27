
import { SavingModule } from './client/savingModule/saving.module';
import { ProfileComponent } from './client/profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { BudgetModule } from './client/budgetModule/budget.module';
import { LayOutComponent } from './client/layout/layout.component';
import { AppRoutingModule } from './app.routing';
import { WalletModule } from './client/walletModule/wallet.module';
import { SavingService } from './service/saving.service';
import { TransactionService } from './service/transaction.service';

import { MyCurrencyPipe } from './pipe/myCurrency.pipe';
import {  RouterModule, Routes} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ClientRegisterComponent } from './client/register/clientregister.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from './client/sharedModule/shared.module';
import { CoreModule } from './client/coreModule/core.module';
import { ChooseCategoryComponent } from './client/reusableComponent/report/choose-category/choose-category.component';
import { ChangePasswordComponent } from './client/changePassword/changePassword.component';
import { ForgotPasswordComponent } from './client/forgotPassword/forgotPassword.component';

// CONFIG ROUTER
const appRoutes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdminComponent,
    MyCurrencyPipe,
    ClientRegisterComponent,
    ClientLoginComponent,
    LayOutComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SavingModule,
    SharedModule,
    BrowserModule,
    WalletModule,
    BrowserAnimationsModule,    
    MatProgressBarModule,
    HttpModule,

  ],
  
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
