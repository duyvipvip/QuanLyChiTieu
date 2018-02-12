import { Debt_LoanSevice } from './../../../../../service/debt-loan.service';
import { Expense } from './../../../../../service/expense.service';
import { InCome } from './../../../../../service/income.service';
import { ICategoryTransaction } from './../../../../../model/category-transaction.model';

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-choose-category-report',
    templateUrl: "./choose-category.html",
    styleUrls: ['choose-category.scss'],
})

export class ChooseCategoryReportComponent{
    dataIncome: Array<any> = [];
    dataExpense: Array<any> = [];
    dataDebtLoan: Array<any> = [];
    @Output() outputChooseCategory: EventEmitter<ICategoryTransaction> = new EventEmitter<ICategoryTransaction>();
    objCategory: ICategoryTransaction;

    constructor(private InCome: InCome,
        private Expense: Expense,
        private Debt_LoanSevice: Debt_LoanSevice,
    ){
        this.getDataIncomes();
        this.getDataExpense();
        this.getDataDebt_Loan();
    }

    chooseCategory(event){
        let eleChoose = event.target.parentNode;
        let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
        let name = eleChoose.querySelectorAll('p')[0].textContent;
        let image = eleChoose.querySelectorAll('img')[0].src;

        this.objCategory = {
            name: name,
            detect: detect,
            image: image
        }
        this.outputChooseCategory.emit(this.objCategory);
    }

    // ============================ FUNCTION ===========================
    // LẤY DATA THU NHẬP TỪ CSDL
    getDataIncomes() {
        this.InCome.getDataIncomes().then((result) => {
            this.dataIncome = result.data;
            
        });
    }

    // LẤY DATA CHI TIÊU TỪ CSDL
    getDataExpense() {
        this.Expense.getDataExpense().then((result) => {
            this.dataExpense = result.data;
        });
    }

    // LẤY DATA NỢ TỪ CSDL
    getDataDebt_Loan(){
        this.Debt_LoanSevice.getDataDebt_Loans()
        .then((result) => {
            this.dataDebtLoan = result.data
        });
    }
}