import { Debt_LoanSevice } from './../../../service/debt-loan.service';
import { Expense } from './../../../service/expense.service';
import { Component } from '@angular/core';
import { InCome } from '../../../service/income.service';
import { ITransaction } from '../../../model/transaction.model';

@Component({
    selector: 'app-transaction',
    styleUrls: ['./transaction.component.scss'],
    templateUrl: './transaction.component.html',
})

export class TransactionComponent{

    dataIncome: Array<any>;
    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;

    titleTransaction: String = "Chọn Giao Dịch";
    nameButtonTransaction: String = "Thêm Giao Dịch";

    constructor(private income: InCome, private expense: Expense, private debt_loan: Debt_LoanSevice){
        this.getDataIncomes();
        this.getDataExpense();
        this.getDataDebt_Loan();
    }

    // ================================ FUNCTIONS =====================
    
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

    chooseDataTransaction(event){
        let objectTranSaction:ITransaction = event;
        if(objectTranSaction.detect == 'income'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Thu Nhập';
        }else if(objectTranSaction.detect == 'expense'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Chi Tiêu';
        }else if(objectTranSaction.detect == 'debt-loan'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Nợ/Vay';
        }
    }
}