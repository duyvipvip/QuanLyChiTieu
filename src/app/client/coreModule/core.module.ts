import { LocalService } from './../../service/local.service';
import { GooleMapsService } from './../../service/googlemaps.service';
import { HttpModule } from '@angular/http';
import { BudgetSevice } from './../../service/budget.servive';
import { CheckValueSevice } from './../../service/check-value.sevice';
import { FomatDateService } from './../../service/fomatDate.service';
import { Expense } from './../../service/expense.service';
import { InCome } from './../../service/income.service';
import { WalletService } from './../../service/wallet.service';
import { AuthenticationService } from './../../service/Authentication.service';
import { loginGuard } from './../../service/guard.service';
import { UserService } from './../../service/user.service';
import { SavingService } from './../../service/saving.service';
import { BudgetModule } from './../budgetModule/budget.module';
import { NgModule } from '@angular/core';
import { Debt_LoanSevice } from '../../service/debt-loan.service';
import { TransactionService } from '../../service/transaction.service';


@NgModule({
    imports: [HttpModule],
    exports: [],
    declarations: [],
    providers: [
        LocalService,
        BudgetModule,
        SavingService,
        UserService,
        loginGuard, 
        AuthenticationService,
        WalletService, 
        InCome,
        Expense,
        Debt_LoanSevice,
        FomatDateService,
        CheckValueSevice,
        BudgetSevice,
        TransactionService,
        GooleMapsService
    ],
})
export class CoreModule { }
