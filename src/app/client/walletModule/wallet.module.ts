import { ChooseWalletUpdateTransactionComponent } from './pagewallet/report/update-transaction/choose-wallet/choose-wallet';
import { ChooseCategoryAddWalletComponent } from './pagewallet/transaction/choose-category/choose-category.component';
import { SharedModule } from './../sharedModule/shared.module';
import { PageWalletComponent } from './pagewallet/pagewallet.component';
import { EditWalletComponent } from './pagewallet/wallet/edit-wallet/edit-wallet.component';
import { WalletComponent } from './pagewallet/wallet/wallet.component';
import { AddWalletComponent } from './pagewallet/wallet/add-wallet/add-wallet.component';
import { TransactionComponent } from './pagewallet/transaction/transaction.component';
import { NgModule} from '@angular/core';
import { NumberPipe } from '../../pipe/number.pipe';
import {  RouterModule, Routes} from '@angular/router';
import { ChooseWalletHomeComponent } from './pagewallet/wallet/choose-wallet/choose-wallet.component';
import { ReportComponent } from './pagewallet/report/report.component';
import { UpdateTransactionReportComponent } from './pagewallet/report/update-transaction/update-transaction';
import { ChooseWalletComponent } from '../reusableComponent/choose-wallet/choose-wallet';
import { ChooseCategoryUpdateTransactionWalletComponent } from './pagewallet/report/update-transaction/choose-category/choose-category.component';
import { ChooseWalletAddTransactionComponent } from './pagewallet/transaction/choose-wallet/choose-wallet';
import { LocationComponent } from './pagewallet/transaction/location/location.component';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '', component: PageWalletComponent
        }, {
            path: ':idwallet', component: PageWalletComponent
        }])
    ],
    exports: [
        PageWalletComponent,
        TransactionComponent,
        AddWalletComponent,
        WalletComponent,
        ChooseWalletHomeComponent,
        EditWalletComponent,
        ReportComponent,
        UpdateTransactionReportComponent,
        ChooseCategoryAddWalletComponent,
        ChooseWalletAddTransactionComponent,
        ChooseCategoryUpdateTransactionWalletComponent,
        ChooseWalletUpdateTransactionComponent,
        ChooseWalletComponent,
    ],
    declarations: [
        PageWalletComponent,
        TransactionComponent,
        AddWalletComponent,
        WalletComponent,
        ChooseWalletHomeComponent,
        EditWalletComponent,
        ReportComponent,
        UpdateTransactionReportComponent,
        ChooseCategoryAddWalletComponent,
        ChooseWalletAddTransactionComponent,
        ChooseCategoryUpdateTransactionWalletComponent,
        ChooseWalletUpdateTransactionComponent,
        ChooseWalletComponent,
        LocationComponent,
    ],
    providers: [],
})
export class WalletModule { }