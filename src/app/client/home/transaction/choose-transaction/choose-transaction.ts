import { Debt_LoanSevice } from './../../../../service/debt-loan.service';
import { Expense } from './../../../../service/expense.service';
import { InCome } from './../../../../service/income.service';
import { ICategoryTransaction } from './../../../../model/category-transaction.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

declare var $:any;

@Component({
    selector: 'app-choose-transaction',
    styleUrls: ['./choose-transaction.scss'],
    templateUrl: './choose-transaction.html',
})
export class ChooseTransactionComponent{

    dataIncome: Array<any>;
    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;
    @Output() chooseDataTransaction: EventEmitter<object> = new EventEmitter<object>();

    constructor(private income: InCome,
        private expense: Expense,
        private debt_loan: Debt_LoanSevice

    ){
        this.getDataIncomes();
        this.getDataExpense();
        this.getDataDebt_Loan();
    }
    
    chooseTransaction(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
        let name = eleChoose.querySelectorAll('p')[0].textContent;
        let image = eleChoose.querySelectorAll('img')[0].src.split('/');
        image = image[image.length - 1].split('.')[0];
        
        // OBJECT NGƯỜI DÙNG CHỌN GIAO DICH
        let objTransaction = {
            name: name,
            _id: id,
            detect: detect,
            image: image
        }
        console.log(objTransaction);
        // GỬI OBJECT NGƯỜI DÙNG CHỌN CHO COMPONENT CHA
        this.chooseDataTransaction.emit(objTransaction);
        
    }
    // ========================== FUNCTION =========================

    // LẤY DATA THU NHẬP TỪ CSDL
    getDataIncomes() {
        this.income.getDataIncomes().then((result) => {
            this.dataIncome = result.data;
        });
    }

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