import { ChooseWalletUpdateTransactionBudgetComponent } from './pagebudget/detailbudget/update-transaction/choose-wallet/choose-wallet';
import { SharedModule } from './../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PageBudgetComponent } from './pagebudget/pagebudget.component';
import { NgModule } from '@angular/core';
import { AddBudgetComponent } from './pagebudget/budget/add-budget/add-budget.conponent';
import { DetailBudgetComponent } from './pagebudget/detailbudget/detailbudget.controller';
import { ChooseCategoryAddBudgetComponent } from './pagebudget/budget/add-budget/choose-category/choose-category.component';
import { BudgetComponent } from './pagebudget/budget/budget.component';
import { HeaderComponent } from '../template/header/header.component';
import { MenuComponent } from '../template/menu/menu.component';
import { FooterComponent } from '../template/footer/footer.component';
import { UpdateBudgetComponent } from './pagebudget/detailbudget/updatebudget/updatebudget.componnet';
import { UpdateTransactionBudgetComponent } from './pagebudget/detailbudget/update-transaction/update-transaction';
import { ChooseCategoryUpdateBudgetComponent } from './pagebudget/detailbudget/updatebudget/choose-category/choose-category.component';
import { ChooseCategoryUpdateTransactionBudgetComponent } from './pagebudget/detailbudget/update-transaction/choose-category/choose-category.component';
@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule ,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        RouterModule.forChild([
             {
                path: '', component: PageBudgetComponent , children: [
                    { path: '', component: BudgetComponent },
                    { path: ':idbudget', component: DetailBudgetComponent },
                ]
            },
        ])
    ],
    exports: [
        UpdateBudgetComponent,
        PageBudgetComponent,
        ChooseCategoryUpdateBudgetComponent,
        BudgetComponent,
        AddBudgetComponent,
        DetailBudgetComponent,
        ChooseCategoryUpdateTransactionBudgetComponent,
        ChooseCategoryAddBudgetComponent,
        UpdateTransactionBudgetComponent,
        ChooseWalletUpdateTransactionBudgetComponent,
    ],
    declarations: [
        UpdateBudgetComponent,
        PageBudgetComponent,
        ChooseCategoryUpdateBudgetComponent,
        BudgetComponent,
        AddBudgetComponent,
        DetailBudgetComponent,
        ChooseCategoryUpdateTransactionBudgetComponent,
        ChooseCategoryAddBudgetComponent,
        UpdateTransactionBudgetComponent,
        ChooseWalletUpdateTransactionBudgetComponent,
    ],
    providers: [],
})
export class BudgetModule { }
