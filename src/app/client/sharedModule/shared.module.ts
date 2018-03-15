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
import { ChooseWalletComponent } from '../reusableComponent/choose-wallet/choose-wallet';
import { ToNumberPipe } from '../../pipe/toNumber.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ToastModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBcVKbNwlOc-3ecroa0iwS-TXhGGarfNu0",
            libraries: ["places"]
        }),
        ReactiveFormsModule
    ],
    exports: [
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
        HeaderComponent,
        NumberPipe,
        ToNumberPipe,
        MenuComponent,
        FooterComponent,

    ],
    providers: [],
})
export class SharedModule { }
