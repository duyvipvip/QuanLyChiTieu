import { ChooseWalletTransferMoneyComponent } from './../reusableComponent/choose-wallet-transfer-money/choose-wallet-transfer-money.component';
import { ChooseCategoryTransferMoneyComponent } from './../reusableComponent/extentd-wallet/transfer-money/choose-category-transfer-money/choose-category-transfer-money.component';
import { ChooseCategoryComponent } from './../reusableComponent/report/choose-category/choose-category.component';
import { ChooseLocationComponent } from './../reusableComponent/report/choose-location/choose-location.component';
import { ChooseWalletComponent } from './../reusableComponent/report/choose-wallet/choose-wallet.component';
import { TransferMoneyComponent } from './../reusableComponent/extentd-wallet/transfer-money/transfer-money.component';
import { ExtentdWalletComponent } from './../reusableComponent/extentd-wallet/extentd-wallet.component';
import { WeekDayPipe } from './../../pipe/weekday.pipe';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NumberPipe } from './../../pipe/number.pipe';
import { FooterComponent } from './../template/footer/footer.component';
import { MenuComponent } from './../template/menu/menu.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import {  RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToNumberPipe } from '../../pipe/toNumber.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ReportComponent } from '../reusableComponent/report/report.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        MatProgressBarModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ToastModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAS97GzU6KUqi2V2XEB6jsarQOk3NCV1JE",
            libraries: ["places"]
        }),
        ReactiveFormsModule
    ],
    exports: [
        MatProgressBarModule,
        ChooseWalletTransferMoneyComponent,
        ChooseCategoryTransferMoneyComponent,
        ChooseCategoryComponent,
        ChooseLocationComponent,
        ChooseWalletComponent,
        TransferMoneyComponent,
        ExtentdWalletComponent,
        ReportComponent,
        WeekDayPipe,
        ReactiveFormsModule,
        AgmCoreModule,
        NgbModule,
        ToastModule,
        MatTabsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule ,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ToNumberPipe,
        HeaderComponent,
        MenuComponent,
        NumberPipe,
        FooterComponent,
    ],
    declarations: [
        ChooseWalletTransferMoneyComponent,
        ChooseCategoryTransferMoneyComponent,
        ChooseCategoryComponent,
        ChooseLocationComponent,
        ChooseWalletComponent,
        TransferMoneyComponent,
        ExtentdWalletComponent,
        ReportComponent,
        HeaderComponent,
        NumberPipe,
        WeekDayPipe,
        ToNumberPipe,
        MenuComponent,
        FooterComponent,
    ],
    providers: [],
})
export class SharedModule { }
