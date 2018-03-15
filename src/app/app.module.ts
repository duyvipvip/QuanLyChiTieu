import { ProfileComponent } from './client/profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { BudgetModule } from './client/budgetModule/budget.module';
import { LayOutComponent } from './client/layout/layout.component';
import { AppRoutingModule } from './app.routing';
import { WalletModule } from './client/walletModule/wallet.module';
import { TransactionSvComponent } from './client/savings/detailsaving/transaction-sv/transaction-sv.component';
import { EditsavingComponent } from './client/savings/editsaving/editsaving.component';
import { SavingService } from './service/saving.service';
import { DetailsavingComponent } from './client/savings/detailsaving/detailsaving.component';
import { ListsavingComponent } from './client/savings/listsaving/listsaving.component';
import { SavingsComponent } from './client/savings/savings.component';
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
import { AddsavingComponent } from './client/savings/addsaving/addsaving.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from './client/sharedModule/shared.module';
import { CoreModule } from './client/coreModule/core.module';
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
    // PHẦN SAVING
    TransactionSvComponent,
    EditsavingComponent,
    AddsavingComponent,
    SavingsComponent,
    ListsavingComponent,
    DetailsavingComponent,
    ProfileComponent
    
    
  ],
  imports: [
    
    AppRoutingModule,
    CoreModule,
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
