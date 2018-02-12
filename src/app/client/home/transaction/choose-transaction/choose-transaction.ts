import { ICategoryTransaction } from './../../../../model/category-transaction.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

declare var jQuery:any;

@Component({
    selector: 'app-choose-transaction',
    styleUrls: ['./choose-transaction.scss'],
    templateUrl: './choose-transaction.html',
})
export class ChooseTransactionComponent{

    @Input() dataIncome:Array<any>;
    @Input() dataExpense:Array<any>;
    @Input() dataDebtLoan:Array<any>;
    @Output() chooseDataTransaction: EventEmitter<object> = new EventEmitter<object>();

    objTransaction: ICategoryTransaction;
    constructor(){
       
    }
    
    chooseTransaction(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
        let name = eleChoose.querySelectorAll('p')[0].textContent;
        let image = eleChoose.querySelectorAll('img')[0].src;

        // OBJECT NGƯỜI DÙNG CHỌN GIAO DICH
        this.objTransaction = {
            name: name,
            _id: id,
            detect: detect,
            image: image
        }
        
        // GỬI OBJECT NGƯỜI DÙNG CHỌN CHO COMPONENT CHA
        this.chooseDataTransaction.emit(this.objTransaction)
        
    }
}