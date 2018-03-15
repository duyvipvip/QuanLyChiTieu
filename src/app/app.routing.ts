import { LayOutComponent } from './client/layout/layout.component';
import { loginGuard } from './service/guard.service';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientLoginComponent } from './client/login/clientlogin.component';
import { ClientRegisterComponent } from './client/register/clientregister.component';
import { DetailsavingComponent } from './client/savings/detailsaving/detailsaving.component';
import { SavingsComponent } from './client/savings/savings.component';
import { ListsavingComponent } from './client/savings/listsaving/listsaving.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './client/profile/profile.component';

const routes: Routes = [

    // ĐƯỜNG DẪN PATH ĐẾN TRANG LOGIN
    {path: 'dangnhap', component: ClientLoginComponent},
  
    { 
      path: '', component: LayOutComponent, children: [
        { path: '', redirectTo: 'wallet', pathMatch: 'full'},
        {path: 'wallet', loadChildren: './client/walletModule/wallet.module#WalletModule'},
        {path: 'budget', loadChildren: './client/budgetModule/budget.module#BudgetModule'}
      ] 
    },
  
    // ĐƯỜNG DẪN URL ĐẾN TRANG ĐĂNG KÍ
    {path: 'dangki', component: ClientRegisterComponent},

    // ĐƯỜNG DẪN URL ĐẾN TRANG THÔNG TIN
    {path: 'thongtin', component: ProfileComponent},
  
    
    //Path Khoan tiet kiem
    // {
    //   path: 'savings', component: SavingsComponent, children:
    //     [
    //       // Default
    //       { path: '', component: ListsavingComponent },
    //       // Detail Khoan tiet kiem
    //       { path: ':idsaving', component: DetailsavingComponent },
    //     ]
    // },
    // ĐƯỜNG DẪN ĐẾN TRANG 404
    {path: '**', component: PageNotFoundComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [];
