import { LayOutComponent } from './client/layout/layout.component';
import { loginGuard } from './service/guard.service';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { ClientRegisterComponent } from './client/register/clientregister.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './client/profile/profile.component';

const routes: Routes = [

    // ĐƯỜNG DẪN PATH ĐẾN TRANG LOGIN
    {path: 'dangnhap', component: ClientLoginComponent},
  
    { 
      path: '', component: LayOutComponent,canActivate:[loginGuard] , children: [
        { path: '', redirectTo: 'wallet', pathMatch: 'full'},
        {path: 'wallet', loadChildren: './client/walletModule/wallet.module#WalletModule'},
        {path: 'budget', loadChildren: './client/budgetModule/budget.module#BudgetModule'},
        {path: 'savings', loadChildren: './client/savingModule/saving.module#SavingModule'},
        {path: 'report', loadChildren: './client/reportModule/report.module#ReportModule'}
      ] 
    },
  
    // ĐƯỜNG DẪN URL ĐẾN TRANG ĐĂNG KÍ
    {path: 'dangki', component: ClientRegisterComponent},

    // ĐƯỜNG DẪN URL ĐẾN TRANG THÔNG TIN
    {path: 'thongtin', component: ProfileComponent},
  
    // ĐƯỜNG DẪN ĐẾN TRANG 404
    {path: '**', component: PageNotFoundComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [];
