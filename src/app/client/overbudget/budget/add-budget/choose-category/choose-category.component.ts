import { Debt_LoanSevice } from './../../../../../service/debt-loan.service';
import { Expense } from './../../../../../service/expense.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "app-choosecategory-budget",
    templateUrl: "./choose-category.component.html",
    styleUrls: ["./choose-category.component.scss"]
})

export class ChooseCategoryBudgetComponent{
    constructor(
        private expense: Expense,
        private debt_loan: Debt_LoanSevice

    ){
        this.getDataExpense();
        this.getDataDebt_Loan();
    }

    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;
    @Output() chooseDataCategory: EventEmitter<object> = new EventEmitter<object>();

    chooseCategory(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let name = eleChoose.querySelectorAll('p')[0].textContent;
        let image = eleChoose.querySelectorAll('img')[0].src.split('/');
        image = image[image.length - 1].split('.')[0];
        
        // OBJECT NGƯỜI DÙNG CHỌN GIAO DICH
        let objTransaction = {
            name: name,
            _id: id,
            image: image
        }
        // GỬI OBJECT NGƯỜI DÙNG CHỌN CHO COMPONENT CHA
        this.chooseDataCategory.emit(objTransaction);
        
    }

     // ========================== FUNCTION =========================

    // LẤY DATA CHI TIÊU TỪ CSDL
    getDataExpense() {
        this.expense.getDataExpense().then((result) => {
            this.dataExpense = result.data;
        });
    }

    // LẤY DATA NỢ TỪ CSDL
    getDataDebt_Loan(){
        this.debt_loan.getDataDebt_Loans()
        .then((result) => {
            this.dataDebtLoan = result.data
        });
    }
}